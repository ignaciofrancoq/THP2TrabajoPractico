import { Pelicula } from "../model/pelicula.js";
import { PeliculaRepository } from "../repository/pelicula.repository.js";


export const PeliculaService = {
  servicePeliculaValidation: async (id) => {
    const codigoPelicula = await PeliculaRepository.getById(id);

    if (!codigoPelicula) return null;

    return codigoPelicula;
  },

  serviceGetAll: async () => {
    const peliculas = PeliculaRepository.getAll();

    if (!peliculas) return null;

    return peliculas;
  },

  servicePeliculaCreation: async (pelicula) => {
    // No generar id, lo genera Supabase
    const modelPelicula = new Pelicula(
      null,
      pelicula.title,
      pelicula.author,
      pelicula.puntaje,
      pelicula.publishedDate,
      pelicula.availableCopies
    );

    const created = await PeliculaRepository.createOne(modelPelicula);

    if (!created) return null;

    return created;
  },
  servicePeliculaDelete: async (id) => {
    const idPelicula = await PeliculaRepository.deleteById(id);
    if (!idPelicula) return null;
    return idPelicula;
  },
  serviceUpdatePelicula: async (id, newData) => {
    const peliculaActualizado = await PeliculaRepository.updateById(
      id,
      newData
    );
    if (!peliculaActualizado) return null;
    return peliculaActualizado;
  },
  // Este método obtiene estadísticas de las películas
  // como el total de películas, el promedio de puntaje y la cantidad de películas por autor.
   getEstadisticas: async () => {
    const peliculas = await PeliculaRepository.getAll();
    const totalPeliculas = peliculas.length;

    const promedioPuntaje =
      totalPeliculas === 0
        ? 0
        : peliculas.reduce((acc, p) => acc + (p.puntaje || 0), 0) / totalPeliculas;

    const cantidadPorAutor = {};

    for (const p of peliculas) {
      const autor = p.author || "Desconocido";
      cantidadPorAutor[autor] = (cantidadPorAutor[autor] || 0) + 1;
    }

    return {
      totalPeliculas,
      promedioPuntaje: parseFloat(promedioPuntaje.toFixed(2)),
      cantidadPorAutor,
    };
  },

  exportarPeliculas: async () => {
    const peliculas = await PeliculaRepository.getAll();

    if (!peliculas || peliculas.length === 0) return null;

    const fields = ["id", "title", "author", "puntaje", "publishedDate", "availableCopies"];
    const { Parser } = await import("json2csv"); // import dinámico porque estás en módulo ES
    const fs = await import("fs/promises");

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(peliculas);

    const filePath = "./src/utils/peliculas_export.csv";
    await fs.writeFile(filePath, csv);

    return filePath;
  },

    deleteAll: async () => {
    return await PeliculaRepository.deleteAll();
  },
};
