import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const CreateMovie = async (ctx: Context) => {
  const { name, rating, year } = ctx.request.body;

  // all fields are required
  if (!name || !rating || !year) {
    ctx.status = 400;
    ctx.body = {
      message: "all fields required",
    };
    return;
  }
  // the movie name can't be bigger than 90 (biggest movie name)
  if (name.length > 90) {
    ctx.status = 400;
    ctx.body = {
      message: "too long name",
    };
    return;
  }
  // the movie rate need to be between 1 and 10 (can't be 0 either)
  if (rating.length > 2 || rating === 0 || rating > 10) {
    ctx.status = 400;
    ctx.body = {
      message: "you can only rate a movie between 1 and 10",
    };
    return;
  }
  // movie year need to have 4 digits only (we on 2022)
  if (year.length !== 4) {
    ctx.status = 400;
    ctx.body = {
      message: "a year need to have 4 digits",
    };
    return;
  }
  //checking if the movie is already in the database before creating
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
