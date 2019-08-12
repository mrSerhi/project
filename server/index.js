import app from "./app";
import { connectDb } from "./config/mongo";

const port = process.env.PORT || 5000;

// connect to mongoDB and run dev server
connectDb().then(async () => {
  app.listen(port, () => console.info(`App is running on ${port} port`));
});
