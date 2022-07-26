import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import Movies from "./models/SchemaMovies";
import { connectDB } from "./mongodb";
import dotenv from "dotenv";

const app = new Koa();
const router = new Router({
  prefix: "/movies",
});

app.use(logger());
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = { message: "Hello, world!" };
});
router.post("/", async (ctx) => {
  try {
    const movie = await Movies.create(ctx.request.body);

    ctx.body = movie;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = { message: "error creating movie" };
  }
});
router.put("/", (ctx) => {});
router.delete("/", (ctx) => {});

async () => {
  try {
    connectDB();
  } catch (err) {
    console.log("unable to connect to database", err);
  }
};

app.use(router.routes());
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
