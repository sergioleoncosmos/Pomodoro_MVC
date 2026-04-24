from fastapi import FastAPI,Request
from fastapi.templating import Jinja2Templates

#inicializamos la app
app =FastAPI(title="Pomodoro Pro")

#configuracion de las vistas
templates = Jinja2Templates(directory="templates")

#controlador pagina inicio 
@app.get('/')
async def home(request:Request):
    #cuando alguien entre a la raiz osea el inicio mostraremos el index.html
    return templates.TemplateResponse("index.html",{"request":request})
