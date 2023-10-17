import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

export interface Product {
  name: string;
  description: string;
  imageSrc?: string;
  price: number;
  stockQty: number;
  minStockQty: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: String,
  price: { type: Number, required: true },
  stockQty: { type: Number, required: true },
  minStockQty: { type: Number, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;