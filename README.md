# API de Películas con Express y Supabase

## 🌍 Resumen

Este proyecto es una API RESTful construida con **Node.js + Express**, con persistencia de datos en **Supabase**. Permite gestionar un listado de películas mediante operaciones CRUD, obtener estadísticas, exportar datos en CSV y está protegida por autenticación básica. Incluye middleware de logging y estructura modular siguiendo el patrón MVC.

---

## 🗂️ Estructura del Proyecto

```
📁 tp2-proyecto-final
├── 📂 src
│   ├── 📂 controllers      # Controladores (lógica de negocio)
│   ├── 📂 routes           # Definición de endpoints
│   ├── 📂 models           # Modelo Pelicula
│   ├── 📂 services         # Lógica intermedia entre controller y repositorio
│   ├── 📂 repositories     # Acceso a Supabase (CRUD + logs)
│   ├── 📂 middleware       # Middlewares: logger y auth
│   ├── 📂 config           # Configuraciones globales y variables de entorno
│   ├── 📂 utils            # Exportador CSV
│   ├── server.js          # Punto de entrada del servidor
├── 📂 tests               # Requests .http y pruebas manuales
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
├── README.md             # Documentación
```

---

## 🔧 Configuraciones Generales (`src/config/config.js`)

- Puerto y host de escucha (`PORT`, `HOST`)
- Credenciales para autenticación básica (`BASIC_AUTH_USER`, `BASIC_AUTH_PASS`)
- `SUPABASE_URL` y `SUPABASE_KEY` para conectarse a la base de datos

> Nota: `DB_PATH` está obsoleto, ya no se usa un JSON local.

---

## 🚀 Endpoints Disponibles (prefijo `/api/pelicula`)

### CRUD principal

- `GET /` — Lista todas las películas
- `GET /:id` — Obtiene una película por ID
- `POST /` — Crea una nueva película
- `PUT /:id` — Actualiza una película existente
- `DELETE /:id` — Elimina una película

### Funcionalidades adicionales

- `GET /estadisticas` — Devuelve:

  - Total de películas
  - Promedio de puntaje
  - Cantidad de películas por autor

- `GET /exportar` — Exporta todas las películas como un archivo CSV descargable

- `DELETE /all` — Elimina **todas** las películas (solo habilitado en `NODE_ENV=test`)

---

## 🪧 Middleware

### Autenticación Básica (`basicAuth`)

Valida las credenciales enviadas por header `Authorization`. En caso incorrecto, responde con 401.

### Logger de Requests (`requestLogger`)

Mide la duración de cada request y guarda un log en Supabase (tabla `logs`).

---

## 🔮 Testing Manual (`tests/peliculas.http`)

Se provee un archivo `.http` para realizar peticiones de prueba:

- CRUD completo
- Exportación CSV
- Estadísticas
- Casos no felices (datos faltantes o ID inexistente)
- Eliminación masiva para limpiar el estado

> Puede usarse con la extensión REST Client de VSCode o herramientas como Insomnia/Postman.

---

## 🔹 Consideraciones Finales

- El proyecto cumple con los requisitos de la materia: modularidad, casos de uso moderados, autenticación, logging, y pruebas.
- Se recomienda levantar el server con:

```bash
npm install
dotenv -e .env -- node src/server.js
```

- Si se desea probar `DELETE /all`, levantar con:

```bash
NODE_ENV=test npm run dev
```

- Para descargar el archivo CSV vía interfaz, abrir en navegador:
  http://localhost:3003/exportar.html

## Modo de Pruebas y Endpoint de Borrado Masivo

- Para poder usar el endpoint de borrado masivo de películas (DELETE /api/pelicula/all), es necesario ejecutar el servidor con la variable NODE_ENV seteada en test:

NODE_ENV=test npm run dev

## Esto protege el uso de este endpoint para que no se ejecute por accidente en entornos productivos y no nos Rajen!

## 📁 Datos de Supabase (Proyecto del equipo)

- **Organization:** Trabajo Práctico THP 2
- **Project Name:** Proyecto THP 2
- **Region:** East US (Ohio)
- **Database Password:** 1Q29MDQj9I# (acceso compartido entre los integrantes)


## Integrantes

- **Matias Ezequiel Smith**: Realizacion del CRUD basico, middleware y supabase.
- **Naim Alexis Issa**: Funciones de complejidad alta (Funcion de exportar y de promedio) y vista de la funcion exportar
- **Ignacio Franco**: Encargado del deploy en Render, las pruebas de Endpoints y la autenticacion.

## Deploy

Realizado en RENDER mediante la posibilidad de cargar un repositorio de GitHub de manera directa mediante la conexion a la cuenta.
link: https://thp2trabajopractico.onrender.com 
