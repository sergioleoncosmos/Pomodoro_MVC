from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import task
from routers import tasks

app = FastAPI()

# Configuramos CORS para permitir que tu Frontend (Vite/React) se conecte sin errores
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En desarrollo permitimos cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

task.Base.metadata.create_all(bind=engine)

app.include_router(
    tasks.router,
    prefix="/tasks",
    tags=["Tareas"]
)

@app.get("/")
def health_check():
    return {"proyecto": "Pomodoro Pro", "estado": "activo y listo para darlo todo"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()