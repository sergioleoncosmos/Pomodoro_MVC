# Importamos los tipos de datos que existen en SQL
from sqlalchemy import Column, Integer, String, Boolean
# Importamos nuestro catálogo oficial
from database import Base

# Nuestra clase hereda de Base
class Task(Base):
    __tablename__ = 'tasks'
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String)
    completed=Column(Boolean,default=False)