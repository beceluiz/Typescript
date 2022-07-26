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

// READ
router.get("/", async (ctx) => {
  try {
    const movies = await Movies.find();

    ctx.body = movies;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { message: "can't find movies" };
  }
});

router;

// CREATE
router.post("/", async (ctx) => {
  try {
    const movies = await Movies.create(ctx.request.body);

    ctx.body = movies;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = { message: "error creating movie" };
  }
});

//UPDATE
router.put("/:id", async (ctx) => {});

//DELETE
router.delete("/", async (ctx) => {});

connectDB();
app.use(router.routes());
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
