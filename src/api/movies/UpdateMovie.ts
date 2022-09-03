import { Context } from "koa";
import Movies from "../../models/SchemaMovies";

export const UpdateMovie = async (ctx: Context) => {
  const { body } = ctx.request;
  const { id } = ctx.params;
  const { name, year, rating } = body;

  if (Object.entries(body).length > 3) {
    ctx.status = 400;
    ctx.body = {
      message:
        "invalid request, your request should only contain: name, year, rating",
    };
    return;
  }

  let message = "";
  if (!name) message += "Attribute [name] is required.\n";
  if (!rating && rating !== 0) message += "Attribute [rating] is required.\n";
  if (!year && year !== 0) message += "Attribute [year] is required.\n";
  if (rating && !Number.isInteger(rating))
    message += "Attribute [rating] should be an integer.\n";
  if (year && !Number.isInteger(year))
    message += "Attribute [year] should be an integer.\n";
  if (Number.isInteger(rating) && (rating < 1 || rating > 10))
    message += "Attribute [rating] should be a value between 1 and 10.\n";
  if (Number.isInteger(year) && (year < 1900 || year > 9999))
    message += "Attribute [year] should be a value between 1900 and 9999.\n";

  if (message !== "") {
    ctx.status = 400;
    ctx.body = {
      message: message,
    };
    return;
  }

  try {
    const movie = await Movies.findByIdAndUpdate(id, body, { new: true });
    ctx.status = 200;
    ctx.body = movie;
  } catch {
    ctx.status = 400;
    console.log("cant update movie");
  }
};
