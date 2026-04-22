# 🍅 Pomodoro Pro MVC

Un sistema de gestión de tiempo (Pomodoro) profesional, diseñado con arquitectura MVC (Modelo-Vista-Controlador) y enfocado en la recolección de datos para análisis de productividad.

## 🛠️ Stack Tecnológico
* **Backend / Controlador:** Python 3.10 + FastAPI
* **Frontend / Vista:** HTML5 + TailwindCSS + JavaScript Nativo
* **Base de Datos / Modelo:** PostgreSQL (Vía Supabase)
* **Entorno Virtual:** Miniconda

## 🚀 Guía de Instalación para el Equipo

**1. Clonar el repositorio**
\`\`\`bash
git clone https://github.com/sergioleoncosmos/Pomodoro_MVC.git
cd Pomodoro_MVC
\`\`\`

**2. Crear y activar el entorno virtual (Miniconda)**
\`\`\`bash
conda create --name pomodoro_mvc python=3.10 -y
conda activate pomodoro_mvc
\`\`\`

**3. Instalar las dependencias**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

**4. Ejecutar el servidor de desarrollo**
\`\`\`bash
uvicorn main:app --reload
\`\`\`
El servidor estará disponible en \`http://127.0.0.1:8000\`. Puedes ver la documentación automática de la API en \`http://127.0.0.1:8000/docs\`.

## 🏗️ Arquitectura MVC
* \`/models\`: Conexión y consultas a la base de datos Supabase.
* \`/templates\`: Interfaces de usuario renderizadas con Jinja2.
* \`main.py\`: Rutas principales y lógica del controlador con FastAPI.