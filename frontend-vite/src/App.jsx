import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientCard from './components/ClientCard'
import LoadingSpinner from './components/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL

// --- COMPONENTE DE NOTIFICAÇÃO (TOAST) ---
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? '#10b981' : '#dc2626';

  return (
    <div style={{
      position: 'fixed', top: '20px', right: '20px', backgroundColor: bg, color: 'white',
      padding: '15px 25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 2000, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
    </div>
  );
}

// --- COMPONENTE DE CONFIRMAÇÃO ---
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginTop: 0, color: '#1f2937' }}>Confirm Action</h3>
        <p style={{ color: '#6b7280', marginBottom: '25px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '10px 20px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

// --- TELA DE LOGIN ---
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/api-token-auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        onLoginSuccess(data.token);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', color: '#1e40af', marginBottom: '30px' }}>CoreFlow CRM</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} required />
          </div>
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
        </form>
      </div>
    </div>
  );
}

// --- APP PRINCIPAL ---
function App() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)

  // Novos estados para UI profissional
  const [toast, setToast] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
      axios.get(`${API_URL}/api/clients/`)
        .then(response => {
          setClients(response.data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error:', error)
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken')
            setToken(null)
          }
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [token])

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const startEditing = (client) => {
    setEditingClient(client);
    setFormData({ name: client.name, email: client.email, phone: client.phone, address: client.address });
    setShowForm(true);
    setSelectedClient(null);
  }

  const requestDelete = (id) => {
    setConfirmDelete(id);
    setSelectedClient(null); // Fecha a modal de detalhes se estiver aberta
  };

  const handleDeleteClient = async () => {
    try {
      await axios.delete(`${API_URL}/api/clients/${confirmDelete}/`);
      setClients(clients.filter(c => c.id !== confirmDelete));
      showToast('Client deleted successfully!');
    } catch (error) {
      console.error('Error deleting:', error);
      showToast('Error deleting client.', 'error');
    }
    setConfirmDelete(null);
  }

  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        const response = await axios.put(`${API_URL}/api/clients/${editingClient.id}/`, formData);
        setClients(clients.map(c => c.id === editingClient.id ? response.data : c));
        showToast('Client updated successfully!');
      } else {
        const response = await axios.post(`${API_URL}/api/clients/`, formData);
        setClients([...clients, response.data]);
        showToast('Client registered successfully!');
      }
      setFormData({ name: '', email: '', phone: '', address: '' });
      setEditingClient(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving:', error);
      showToast('Error saving client. Check fields.', 'error');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  }

  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.phone.toLowerCase().includes(term) ||
      client.address.toLowerCase().includes(term)
    );
  })

  if (!token) return <Login onLoginSuccess={setToken} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* Toast de Notificação */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modal de Confirmação de Delete */}
      {confirmDelete && <ConfirmModal message="Are you sure you want to permanently delete this client?" onConfirm={handleDeleteClient} onCancel={() => setConfirmDelete(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#1e40af', margin: 0, fontSize: '32px' }}>Client Management System</h1>
          <h2 style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'normal' }}>(CoreFlow CRM - Dashboard)</h2>
        </div>
        <div>
          <button onClick={() => { setEditingClient(null); setFormData({ name: '', email: '', phone: '', address: '' }); setShowForm(!showForm); setSelectedClient(null); }} style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>
            {showForm && !editingClient ? 'Cancel' : '+ New Client'}
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <input type="text" placeholder="🔍 Search by name, email, phone or address..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px 20px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} />
      </div>

      <h2 style={{ color: '#374151', textAlign: 'center' }}>Total Clients: {filteredClients.length} {searchTerm && `(filtered from ${clients.length})`}</h2>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '500px', margin: '0 auto 30px auto', border: '1px solid #e5e7eb' }}>
          <h3 style={{ marginTop: 0, color: '#1e40af' }}>{editingClient ? 'Edit Client' : 'Register New Client'}</h3>
          <form onSubmit={handleSaveClient}>
            {['name', 'email', 'phone', 'address'].map(field => (
              <div key={field} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type={field === 'email' ? 'email' : 'text'} name={field} value={formData[field]} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
            ))}
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              {editingClient ? 'Save Changes' : 'Save Client'}
            </button>
          </form>
        </div>
      )}

      {selectedClient && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setSelectedClient(null)}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', maxWidth: '500px', width: '90%', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#1e40af', margin: 0 }}>Client Details</h2>
              <button onClick={() => setSelectedClient(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            <h3 style={{ color: '#1f2937', margin: '0 0 20px 0', fontSize: '24px' }}>{selectedClient.name}</h3>
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <p style={{ margin: '10px 0', color: '#374151' }}><strong>📧 Email:</strong> {selectedClient.email}</p>
              <p style={{ margin: '10px 0', color: '#374151' }}><strong>📞 Phone:</strong> {selectedClient.phone}</p>
              <p style={{ margin: '10px 0', color: '#374151' }}><strong>📍 Address:</strong> {selectedClient.address}</p>
            </div>
            <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #bfdbfe' }}>
              <p style={{ margin: '5px 0', color: '#1e40af', fontSize: '14px' }}><strong>Created:</strong> {new Date(selectedClient.created_at).toLocaleString()}</p>
              <p style={{ margin: '5px 0', color: '#1e40af', fontSize: '14px' }}><strong>Last Updated:</strong> {new Date(selectedClient.updated_at).toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startEditing(selectedClient)} style={{ flex: 1, padding: '12px', backgroundColor: '#5b9bd5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>✏️ Edit</button>
              <button onClick={() => requestDelete(selectedClient.id)} style={{ flex: 1, padding: '12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      )}

      {filteredClients.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No clients found for "{searchTerm}"</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} onEdit={startEditing} onDelete={requestDelete} onView={setSelectedClient} />
        ))}
      </div>
    </div>
  )
}

export default App