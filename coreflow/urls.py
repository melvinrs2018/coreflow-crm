from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('crm.urls')),  # Conecta as rotas da nossa API
    path('api-token-auth/', obtain_auth_token),
]

# Serve o frontend React (index.html) para qualquer outra rota
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]