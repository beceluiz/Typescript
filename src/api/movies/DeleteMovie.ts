import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const DeleteMovie = async (ctx: Context) => {
  try {
    const movies = await Movies.findByIdAndDelete(ctx.params.id);
    ctx.body = { message: "movie deleted!" };
  } catch {
    ctx.status = 400;
    console.log("cant update movie");
  }
};
