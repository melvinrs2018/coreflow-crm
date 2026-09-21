from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('crm.urls')), # Conecta as rotas da nossa API
       path('api-token-auth/', obtain_auth_token), # # ← Adicionar isso suas outras URLs
]
