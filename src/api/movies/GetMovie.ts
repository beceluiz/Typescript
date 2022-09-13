import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const GetMovie = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    if (!id) {
      ctx.status = 400;
      ctx.body = { message: "you must provide a id" };
      return;
    }

    const { _id, name, year, rating } = await Movies.findById({ _id: id });

    ctx.body = {
      name: name,
      year: year,
      rating: rating,
      id: _id,
    };
  } catch (err) {
    ctx.status = 404;
    ctx.body = { error: "movie not found" };
  }
};
