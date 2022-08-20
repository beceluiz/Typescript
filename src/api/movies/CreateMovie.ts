import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const CreateMovie = async (ctx: Context) => {
  try {
    const movies = await Movies.create(ctx.request.body);

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "error creating movie" };
  }
};
