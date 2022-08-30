import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const DeleteMovie = async (ctx: Context) => {
  const { id } = ctx.params;

  const movie = await Movies.findOne({ _id: id });
  if (!movie) {
    ctx.status = 422;
    ctx.body = {
      message: "movie not found",
    };
    return;
  }

  try {
    await movie.deleteOne({ _id: id });

    ctx.status = 200;
    ctx.body = {
      message: "movie deleted",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: error,
    };
  }
};
