import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const CreateMovie = async (ctx: Context) => {
  const { name, rating, year } = ctx.request.body;

  if (!name || !rating || !year) {
    ctx.status = 400;
    ctx.body = {
      message: "all fields required",
    };
    return;
  }
  if (name.length > 30) {
    ctx.status = 400;
    ctx.body = {
      message: "too long name",
    };
    return;
  }
  if (rating.length > 2 || rating === "0" || rating > 10) {
    ctx.status = 400;
    ctx.body = {
      message: "you can only rate a movie between 1 and 10",
    };
    return;
  }
  if (year.length > 4 || year.length < 4) {
    ctx.status = 400;
    ctx.body = {
      message: "a year need to have 4 characters",
    };
    return;
  }
  try {
    const movieAlreadyExists = await Movies.findOne({ name: name }).exec();

    if (movieAlreadyExists) {
      ctx.status = 400;
      ctx.body = {
        message: "movie already exists",
      };
      return;
    }

    Movies.create({ name: name, year: year, rating: rating });
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: "error creating movie",
    };
  }
};
