import mongoose from "mongoose";
import { StockInArray } from "./StockIn";
import { StockOutArray } from "./StockOut";

const { Schema, models, model } = mongoose;

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  imageSrc?: string;
  price: number;
  stockQty: number;
  minStockQty: number;
  stockIns: StockInArray;
  stockOuts: StockOutArray;
}

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: String },
  price: { type: Number, required: true },
  stockQty: { type: Number, required: true },
  minStockQty: { type: Number, required: true },
  stockIns: { type: [Schema.Types.ObjectId], ref: "StockIn" },
  stockOuts: { type: [Schema.Types.ObjectId], ref: "StockOut" },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
