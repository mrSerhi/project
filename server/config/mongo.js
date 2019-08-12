import mongoose from "mongoose";

const DB_URL = process.env.MONGO_DB_URL;

export const connectDb = () => {
  return mongoose
    .connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((exp) => {
      console.error(exp);
      process.exit();
    });
};
