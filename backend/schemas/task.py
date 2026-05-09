from pydantic import BaseModel

# 1. ESQUEMA BASE: Lo que comparten TODOS los pedidos
class TaskBase(BaseModel):
    title: str

# 2. ESQUEMA DE CREACIÓN: Lo que el cliente envía (Hereda de taskbase)
# Cuando el cliente pide, no sabe qué número de ticket (id) le tocará.
class TaskCreate(TaskBase):
    pass # 'pass' significa que no añadimos nada nuevo, solo usamos la base

# 3. ESQUEMA DE RESPUESTA: Lo que el mesero entrega de vuelta al cliente
class TaskResponse(TaskBase):
    id: int
    completed: bool # <-- Ajustado para que coincida con la BD

    # Esta configuración mágica le dice a Pydantic: 
    # "Oye, no vas a recibir un diccionario común, vas a recibir un modelo de SQLAlchemy. 
    # Por favor, lee sus atributos directamente."
    model_config = {"from_attributes": True}