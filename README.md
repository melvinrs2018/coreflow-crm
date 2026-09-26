# CoreFlow CRM

A full-stack CRM (Customer Relationship Management) web application built with Django REST Framework and React, designed to manage clients, orders, quotes, services, and tasks.

🔗 **Live demo:** [melvinrs2018.github.io/coreflow-crm](https://melvinrs2018.github.io/coreflow-crm/)

---

## Features

- Client management (create, edit, delete)
- Orders, quotes, services, and tasks tracking
- Token-based authentication
- Audit logs
- Responsive React interface

## Tech Stack

**Backend**
- Python & Django
- Django REST Framework
- Token Authentication (`rest_framework.authtoken`)
- SQLite
- `django-cors-headers`
- `python-decouple` (environment variables / security)

**Frontend**
- React
- Vite
- Axios

**Infrastructure & Deployment**
- Git & GitHub
- GitHub Pages (frontend hosting)
- PythonAnywhere (backend hosting)
- `gh-pages` (automated frontend deployment)

## Security & Best Practices

- Separated development and production environments
- `DEBUG` disabled in production
- Secret key stored as an environment variable (never committed to version control)
- CORS configured to allow only trusted origins

## Local Setup

### Backend

```bash
cd CoreFlow CRM
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Create a `.env` file in the project root with:

```
SECRET_KEY=your-secret-key-here
```

### Frontend

```bash
cd frontend-vite
npm install
npm run dev
```

Create a `.env` file inside `frontend-vite` with:

```
VITE_API_URL=http://127.0.0.1:8000
```

## Author

**Melvin Fernandes**
Full-Stack Developer / UX-UI Designer / Graphic Designer
