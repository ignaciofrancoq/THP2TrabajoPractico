// src/routes/pelicula.route.js
import { Router } from "express";
import { PeliculaController } from "../controller/pelicula.controller.js";
import { basicAuth } from "../middleware/basicAuth.js";

const peliculaRouter = Router();

peliculaRouter.use(basicAuth); //Aca estoy implementando la basicAuth para todas las rutas

// Rutas específicas primero
peliculaRouter.delete("/all", PeliculaController.deleteAllMovies);
peliculaRouter.get("/estadisticas", PeliculaController.getEstadisticas);
peliculaRouter.get("/exportar", PeliculaController.peliculaExportar);


// CRUD de películas
peliculaRouter.get("/", PeliculaController.peliculaGetAll);
peliculaRouter.get("/:id", PeliculaController.peliculaGetById);
peliculaRouter.post("/", PeliculaController.peliculaCreateOne);
peliculaRouter.put("/:id", PeliculaController.peliculaUpdateById);
peliculaRouter.delete("/:id", PeliculaController.peliculaDeleteOne);


export { peliculaRouter };
