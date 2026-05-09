from database import engine
from sqlalchemy import text # la que nos permite escribir sql crudo

try:
    #intentamos abrir la peurta de comunicaicn
    with engine.connect() as conexion:
        resultado=conexion.execute(text("SELECT 1"))
        print('exito al conectar a la base de datos pomodoro db')
except Exception as e:
    #si no abre por mala contrasena o lo qeu sea captramos el error
    print(f'la puerta esta cerrada por: {e}')