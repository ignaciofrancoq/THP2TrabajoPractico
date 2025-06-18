import { supabase } from "../db/supabase.cnx.js";

export const PeliculaRepository = {
  getById: async (id) => {
    const { data, error } = await supabase
      .from("peliculas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from("peliculas").select("*");
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  createOne: async (pelicula) => {
    const { data, error } = await supabase
      .from("peliculas")
      .insert([
        {
          title: pelicula.title,
          author: pelicula.author,
          puntaje: pelicula.puntaje,
          publishedDate: pelicula.publishedDate,
          availableCopies: pelicula.availableCopies,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase
      .from("peliculas")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    // Si no borró nada, retorna null
    if (!data || data.length === 0) {
      return null;
    }

    return id;
  },

  updateById: async (id, newData) => {
    const { data, error } = await supabase
      .from("peliculas")
      .update(newData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteAll: async () => {
    // Usamos Supabase para hacer un DELETE en la tabla "peliculas"
    // Le decimos que borre todo lo que tenga un id que NO sea null
    // (porque Supabase necesita una condición para borrar múltiples filas)
    const { error } = await supabase
      .from("peliculas")
      .delete()
      .not("id", "is", null); // Condición correcta: id IS NOT NULL
    // Si ocurre un error, lo mostramos en consola y devolvemos null
    if (error) {
      console.error("Error al borrar todas las películas:", error);
      return null;
    }
    // Si todo salió bien, devolvemos true como confirmación
    return true;
  },
};
