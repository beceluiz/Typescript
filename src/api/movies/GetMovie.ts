import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const GetMovie = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const movies = await Movies.findById({ _id: id });

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "movie not found" };
  }
};
