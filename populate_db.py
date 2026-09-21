import os
import django
import random
from datetime import date, timedelta

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coreflow.settings')
django.setup()

from crm.models import Client, Service, Quote, Order, Task

print("🚀 Iniciando população do banco de dados...")

# 1. Criar Serviços
servicos = ['Web Design', 'SEO', 'Marketing Digital', 'Desenvolvimento Python', 'Consultoria TI']
for s in servicos:
    Service.objects.create(name=s, hourly_rate=random.randint(50, 150), description=f'Serviço profissional de {s}')
print("✅ Serviços criados!")

# 2. Criar 20 Clientes
for i in range(1, 21):
    Client.objects.create(
        name=f'Empresa Belga {i}', 
        email=f'contato@empresa{i}.be', 
        phone=f'+32 400 00 00 {i:02d}', 
        address=f'Rue de la Loi {i}, Bruxelas'
    )
print("✅ Clientes criados!")

# 3. Criar Orçamentos e Pedidos
clientes = Client.objects.all()
for cliente in clientes[:15]:
    Quote.objects.create(
        client=cliente, 
        status='accepted', 
        total_amount=random.randint(1000, 15000), 
        valid_until=date.today() + timedelta(days=30)
    )
    Order.objects.create(client=cliente, status='in_progress')
print("✅ Orçamentos e Pedidos criados!")

# 4. Criar Tarefas
pedidos = Order.objects.all()
for pedido in pedidos:
    Task.objects.create(
        title=f'Implementar projeto para {pedido.client.name}', 
        order=pedido, 
        priority='high', 
        due_date=date.today() + timedelta(days=15)
    )
print("✅ Tarefas criadas!")

print("\n BANCO DE DADOS 100% CHEIO! ")