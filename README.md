# Demo Cloud SDK

Una aplicación web simple para enviar solicitudes de pago a través de la API de BillPocket.

## Características

- Formulario web para enviar solicitudes de pago
- Validación de datos en el frontend y backend
- Interfaz moderna con Bootstrap
- Manejo de errores mejorado

## Instalación Local

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación:
   ```bash
   npm start
   ```
4. Abre http://localhost:3000 en tu navegador

## Despliegue en Render

### Opción 1: Despliegue Automático con render.yaml

1. Conecta tu repositorio de GitHub a Render
2. Render detectará automáticamente el archivo `render.yaml` y configurará el servicio
3. El despliegue se realizará automáticamente

### Opción 2: Despliegue Manual

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: demo-cloud-sdk
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

## Variables de Entorno

- `NODE_ENV`: production (configurado automáticamente en Render)
- `PORT`: Puerto del servidor (configurado automáticamente en Render)

## Estructura del Proyecto

```
demo-cloud-sdk/
├── app.js              # Configuración principal de Express
├── bin/www             # Servidor HTTP
├── routes/             # Rutas de la aplicación
├── views/              # Plantillas Jade
├── public/             # Archivos estáticos
└── package.json        # Dependencias y scripts
```

## API Endpoints

- `GET /`: Página principal con el formulario
- `POST /payment`: Endpoint para enviar solicitudes de pago

## Tecnologías Utilizadas

- Node.js
- Express.js
- Jade (Pug)
- Bootstrap 5
- Request (para llamadas HTTP) 