Backend de LegislatiBot

Este es el servidor de API para LegislatiBot, construido con FastAPI.

Configuración

Instalar dependencias:

pip install -r requirements.txt


Configurar variables de entorno:
Renombra .env.example a .env y edita los valores.

mv .env.example .env


Asegúrate de que Ollama esté corriendo localmente.

Ejecutar la aplicación:

uvicorn app.main:app --reload


La API estará disponible en http://127.0.0.1:8000 y la documentación de Swagger en http://127.0.0.1:8000/docs.