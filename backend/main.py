from fastapi import FastAPI
from database import engine
from models import task
from routers import tasks

app = FastAPI()

task.Base.metadata.create_all(bind=engine)

app.include_router(
    tasks.router,
    prefix="/tasks",
    tags=["Tareas"]
)

@app.get("/")
def health_check():
    return {"proyecto": "Pomodoro Pro", "estado": "activo y listo para darlo todo"}