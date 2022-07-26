import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import Movies from "./models/SchemaMovies";
import { connectDB } from "./mongodb";
import dotenv from "dotenv";
import { connect } from "mongoose";

const app = new Koa();
const router = new Router({
  prefix: "/movies",
});

app.use(logger());
app.use(bodyParser());

//GET ALL

router.get("/", async (ctx) => {
  try {
    const movies = await Movies.find();

    ctx.body = movies;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { error: "can't find movies" };
  }
});
// READ
router.get("/:id", async (ctx) => {
  try {
    const movies = await Movies.findById(ctx.params.id);

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "movie not found" };
  }
});

router;

// CREATE
router.post("/", async (ctx) => {
  try {
    const movies = await Movies.create(ctx.request.body);

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "error creating movie" };
  }
});

//UPDATE
router.put("/:id", async (ctx) => {
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
});

//DELETE
router.delete("/:id", async (ctx) => {
  try {
    const movies = await Movies.findByIdAndDelete(ctx.params.id);
    ctx.body = { message: "movie deleted!" };
  } catch {
    ctx.status = 400;
    console.log("cant update movie");
  }
});

connectDB();
app.use(router.routes());
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
