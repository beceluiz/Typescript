import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const UpdateMovie = async (ctx: Context) => {
  try {
    const movies = await Movies.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      { new: true }
    );
    ctx.body = movies;
  } catch {
    ctx.status = 400;
    console.log("cant update movie");
  }
};
