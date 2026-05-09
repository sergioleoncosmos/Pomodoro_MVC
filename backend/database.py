import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv() 

url_base_datos = os.getenv("DATABASE_URL")

engine = create_engine(url_base_datos)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# La función se muda aquí:
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()