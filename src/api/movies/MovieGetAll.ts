import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const GetAllMovies = async (ctx: Context) => {
  try {
    const movies = await Movies.find();

    ctx.body = movies;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { error: "can't find movies" };
  }
};
