import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const GetMovie = async (ctx: Context) => {
  try {
    const movies = await Movies.findById(ctx.params.id);

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "movie not found" };
  }
};
