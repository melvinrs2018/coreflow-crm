from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Cria um roteador que gera as URLs automaticamente
router = DefaultRouter()
router.register(r'clients', views.ClientViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'quotes', views.QuoteViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]