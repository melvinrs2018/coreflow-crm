from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Ajuste 'crm.urls' ou 'tasks.urls' conforme o nome real dos seus apps
    path('api/', include('crm.urls')), 
    path('api/', include('tasks.urls')),
]