import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connection";
import fetchProducts from "./products/controller/fetch-products";

dotenv.config();
const app: Application = express();

const port: number = Number(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("Mongo Vanthuten");
});

app.get("/products", fetchProducts);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
    process.exit(1);
  });
