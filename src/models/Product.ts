import { Schema, model, Document } from "mongoose";

interface IDiscount {
  amount: string;
  valid_until: Date | null;
}

interface IPrice {
  currency: string;
  amount: string;
  discount: IDiscount;
}

interface IDimensions {
  length: number | null;
  width: number | null;
  height: number | null;
}

interface ISpecifications {
  weight: string;
  dimensions: IDimensions;
  color: string;
  material: string;
}

interface IImage {
  url: string;
  alt_text: string;
}

interface IReview {
  review_id: string;
  user_id: string;
  rating: string;
  comment: string;
  date: Date;
}

interface IProduct extends Document {
  name: string;
  description: string;
  merchantId: string;
  categoryId: string;
  price: IPrice;
  specifications: ISpecifications;
  images: IImage[];
  created_at: Date;
  updated_at: Date;
  reviews: IReview[];
}

const discountSchema = new Schema<IDiscount>({
  amount: { type: String, required: true },
  valid_until: { type: Date, default: null },
});

const priceSchema = new Schema<IPrice>({
  currency: { type: String, required: true },
  amount: { type: String, required: true },
  discount: { type: discountSchema, required: true },
});

const dimensionsSchema = new Schema<IDimensions>({
  length: { type: Number, default: null },
  width: { type: Number, default: null },
  height: { type: Number, default: null },
});

const specificationsSchema = new Schema<ISpecifications>({
  weight: { type: String, required: true },
  dimensions: { type: dimensionsSchema, required: true },
  color: { type: String, required: true },
  material: { type: String, required: true },
});

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  alt_text: { type: String, required: true },
});

const reviewSchema = new Schema<IReview>({
  review_id: { type: String, required: true },
  user_id: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  merchantId: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: priceSchema, required: true },
  specifications: { type: specificationsSchema, required: true },
  images: { type: [imageSchema], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  reviews: { type: [reviewSchema], required: true },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
