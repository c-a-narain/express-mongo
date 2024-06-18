import express, { Request, Response } from "express";
import { connectDb } from "../../db/connection";
import mongoose, { model } from "mongoose";
import Product from "../../models/Product";

const app = express();
app.use(express.json());
require("dotenv").config();

const ProductSchema = new mongoose.Schema({});

const fetchProducts = async (req: Request, res: Response) => {
  console.log(Product);
  try {
    const data = await Product.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ err: err.message() });
  }
};

export default fetchProducts;
