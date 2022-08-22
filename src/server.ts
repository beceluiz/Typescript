import app from "./app";
import { connectDB } from "./mongodb";
import { createServer } from "http";
import { config } from "./config";

(async () => {
  await connectDB();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running at http://localhost:${config.PORT}`);
  });
})();
