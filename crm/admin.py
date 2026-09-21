from django.contrib import admin
from .models import Client, Service, Quote, Order, Task, Document, AuditLog

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    search_fields = ('name', 'email')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'hourly_rate', 'is_active')

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ('client', 'status', 'total_amount', 'valid_until', 'created_at')
    list_filter = ('status',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('client', 'status', 'created_at')
    list_filter = ('status',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'assigned_to', 'priority', 'is_completed', 'due_date')
    list_filter = ('priority', 'is_completed')

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'uploaded_at')

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'model_name', 'timestamp')
