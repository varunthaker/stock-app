import mongoose from "mongoose";
import { StockDataType } from "./stock";

const { Schema, models, model } = mongoose;

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  imageSrc?: string;
  price: number;
  stockQty: number;
  minStockQty: number;
  stocks: StockDataType;
}

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: String,
  price: { type: Number, required: true },
  stockQty: { type: Number, required: true },
  minStockQty: { type: Number, required: true },
  stocks: { type: [Schema.Types.ObjectId], ref: "Stock" },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
