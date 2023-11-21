import mongoose from "mongoose";
import Stockin from "@/db/model/StockIn";
import Stockout, { StockOut } from "@/db/model/StockOut";

const { Schema } = mongoose;

type StockInArray = {
  date: String;
  stockInQty: Number;
  reference: string;
};

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  imageSrc?: string;
  price: number;
  stockQty: number;
  minStockQty: number;
  stockins: StockInArray;
  stockouts: StockOut[];
}

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: String },
  price: { type: Number, required: true },
  stockQty: { type: Number, required: true },
  minStockQty: { type: Number, required: true },
  stockins: [{ type: Schema.Types.ObjectId, ref: Stockin }],
  stockouts: [{ type: Schema.Types.ObjectId, ref: Stockout }],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
