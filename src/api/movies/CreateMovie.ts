import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const CreateMovie = async (ctx: Context) => {
  const { name, rating, year } = ctx.request.body;

  // input validators
  let message = "";
  if (!name) message += "Attribute [name] is required.\n";
  if (!rating && rating !== 0) message += "Attribute [rating] is required.\n";
  if (!year && year !== 0) message += "Attribute [year] is required.\n";
  if (rating && !Number.isInteger(rating))
    message += "\nAttribute [rating] should be an integer.\n";
  if (year && !Number.isInteger(year))
    message += "\n Attribute [year] should be an integer.\n";
  if (Number.isInteger(rating) && (rating < 1 || rating > 10))
    message += "\nAttribute [rating] should be a value between 1 and 10.\n";
  if (Number.isInteger(year) && (year < 1900 || year > 9999))
    message += "\nAttribute [year] should be a value between 1900 and 9999.\n";

  if (message !== "") {
    ctx.status = 400;
    ctx.body = {
      message: message,
    };
    return;
  }
  try {
    const movieAlreadyExists = await Movies.findOne({ name: name });

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
