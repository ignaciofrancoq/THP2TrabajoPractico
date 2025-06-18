import { PeliculaService } from "../services/pelicula.service.js";
// Importamos módulos necesarios para manejar rutas de archivos
import path from "path"; // Para resolver rutas de archivos
import { fileURLToPath } from "url"; // Para obtener la URL del archivo actual

// Estas dos líneas nos permiten usar __dirname en módulos ES (import/export)
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta completa del archivo actual
const __dirname = path.dirname(__filename); // Extrae el directorio base a partir de esa ruta



export const PeliculaController = {
  peliculaCreateOne: async (req, res) => {
    const pelicula = req.body;
    try {
      const response = await PeliculaService.servicePeliculaCreation(pelicula);

      if (!response) {
        res.status(400).json({
          payload: null,
          message: "Datos inválidos o error al crear la película",
          ok: false,
        });
        return;
      }

      res.status(201).json({
        message: "Creado correctamente",
        payload: { ...response, id: response.id },
        ok: true,
      });
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({
        payload: null,
        message: "Error inesperado al crear la película",
        ok: false,
      });
    }
  },

  peliculaGetAll: async (req, res) => {
    const peliculas = await PeliculaService.serviceGetAll();

    if (!peliculas) {
      res.status(404).json({
        message: "Error al leer los peliculas",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: peliculas,
      ok: true,
    });
    return;
  },

  peliculaGetById: async (req, res) => {
    const { id } = req.params;
    const pelicula = await PeliculaService.servicePeliculaValidation(id);

    if (!pelicula) {
      res.status(404).json({
        message: "Error, no existe la pelicula",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: pelicula,
      ok: true,
    });
    return;
  },

  peliculaDeleteOne: async (req, res) => {
    const { id } = req.params;
    const pelicula = await PeliculaService.servicePeliculaValidation(id);
    const idPelicula = await PeliculaService.servicePeliculaDelete(id);

    if (!idPelicula) {
      res.status(404).json({
        payload: null,
        message: "No se encontro la pelicula a borrar",
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: `Pelicula borrada satisfactoriamente`,
      payload: pelicula,
      ok: true,
    });
    return;
  },

  peliculaUpdateById: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const peliculaUpdated = await PeliculaService.serviceUpdatePelicula(
      id,
      newData
    );

    if (!peliculaUpdated) {
      res.status(404).json({
        ok: false,
        payload: null,
        message: "Fallo al actualizar la pelicula",
      });
      return;
    }

    res.status(200).json({
      message: `Pelicula modificado`,
      payload: peliculaUpdated,
      ok: true,
    });
    return;
  },

getEstadisticas: async (req, res) => {
    try {
      const estadisticas = await PeliculaService.getEstadisticas();
      res.status(200).json(estadisticas);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  peliculaExportar: async (req, res) => {
    try {
      const filePath = await PeliculaService.exportarPeliculas();

      if (!filePath) {
        res.status(404).json({
          message: "No hay películas para exportar",
          payload: null,
          ok: false,
        });
        return;
      }

      const absolutePath = path.resolve(__dirname, "..", filePath.replace("./src/", ""));
      res.download(absolutePath, "peliculas.csv");
      return;
    } catch (error) {
      console.error("Error al exportar películas:", error);
      res.status(500).json({
        message: "Error inesperado al exportar películas",
        payload: null,
        ok: false,
      });
      return;
    }
  },
    deleteAllMovies: async (req, res) => {
    if (process.env.NODE_ENV !== "test") {
      return res.status(403).json({
        ok: false,
        message: "No autorizado fuera de entorno de testing",
        payload: null,
      });
    }

    try {
      const peliculas = await PeliculaService.serviceGetAll();
      await PeliculaService.deleteAll();
      res.status(200).json({
        ok: true,
        message: "Películas eliminadas exitosamente",
        payload: peliculas,
      });
    } catch (error) {
      console.error("Error al borrar todas las películas:", error);
      res.status(500).json({
        ok: false,
        message: "Error interno al borrar películas",
        payload: null,
      });
    }
  },



};
