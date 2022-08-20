import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import Movies from "./models/SchemaMovies";
import { connectDB } from "./mongodb";
import dotenv from "dotenv";
import { connect } from "mongoose";

import { GetAllMovies } from "./api/movies/MovieGetAll";
import { GetMovie } from "./api/movies/GetMovie";
import { DeleteMovie } from "./api/movies/DeleteMovie";
import { CreateMovie } from "./api/movies/CreateMovie";
import { UpdateMovie } from "./api/movies/UpdateMovie";

const app = new Koa();
const index = new Router();
const router = new Router();

app.use(logger());
app.use(bodyParser());

// INDEX PAGE

router.get("/", async (ctx) => {
  ctx.body = { message: "Welcome to my first KOA API!" };
});

// CRUD Routes
router.get("/movies", GetAllMovies);
router.get("/movies/:id", GetMovie);
router.post("/movies/", CreateMovie);
router.put("/movies/:id", UpdateMovie);
router.delete("/movies/:id", DeleteMovie);

connectDB();
app.use(router.routes());
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
