export default function ClientCard({ client, onEdit, onDelete, onView }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      borderLeft: '5px solid #1e40af',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onClick={() => onView(client)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>{client.name}</h3>
      <p style={{ margin: '5px 0', color: '#6b7280' }}>📧 {client.email}</p>
      <p style={{ margin: '5px 0', color: '#6b7280' }}>📞 {client.phone}</p>
      <p style={{ margin: '5px 0 20px 0', color: '#6b7280' }}>📍 {client.address}</p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(client); }}
          style={{ flex: 1, padding: '8px', backgroundColor: '#5b9bd5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ✏️ Edit
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(client.id); }}
          style={{ flex: 1, padding: '8px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}