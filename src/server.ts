import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import Movies from "./models/SchemaMovies";
import { connectDB } from "./mongodb";
import dotenv from "dotenv";
import { connect } from "mongoose";

const app = new Koa();
const index = new Router();
const router = new Router();

app.use(logger());
app.use(bodyParser());

// INDEX PAGE

router.get("/", async (ctx) => {
  ctx.body = { message: "Welcome to my first KOA API!" };
});

//GET ALL

router.get("/movies", async (ctx) => {
  try {
    const movies = await Movies.find();

    ctx.body = movies;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { error: "can't find movies" };
  }
});
// READ
router.get("/movies/:id", async (ctx) => {
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
router.post("/movies/", async (ctx) => {
  try {
    const movies = await Movies.create(ctx.request.body);

    ctx.body = movies;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "error creating movie" };
  }
});

//UPDATE
router.put("/movies/:id", async (ctx) => {
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
router.delete("/movies/:id", async (ctx) => {
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
