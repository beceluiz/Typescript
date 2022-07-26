import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router({
  prefix: "/movies",
});

app.use(logger());
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = { message: "Hello, mundo!" };
});
router.post("/", (ctx) => {});
router.put("/", (ctx) => {});
router.delete("/", (ctx) => {});

app.use(router.routes());
app.listen(3000, () => {
  console.log("liestening on http://localhost:3000");
});
