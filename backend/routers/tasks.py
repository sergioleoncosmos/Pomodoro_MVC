from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from models import task as task_model
from schemas import task as task_schema

router = APIRouter()

# 1. Endpoint para CREAR (POST)
@router.post("/", response_model=task_schema.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: task_schema.TaskCreate, db: Session = Depends(get_db)):
    nueva_tarea = task_model.Task(title=task.title)
    db.add(nueva_tarea)
    db.commit()
    db.refresh(nueva_tarea)
    return nueva_tarea

# 2. Endpoint para LEER TODAS (GET)
@router.get("/", response_model=list[task_schema.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tareas = db.query(task_model.Task).all()
    return tareas