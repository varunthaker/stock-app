import mongoose from "mongoose";

const { Schema } = mongoose;

export type StockOut = {
  date: string;
  stockOutQty: number;
  reference: string;
};

const stockoutSchema = new Schema<StockOut>({
  date: String,
  stockOutQty: Number,
  reference: String,
});

const Stockout =
  mongoose.models?.Stockout || mongoose.model("Stockout", stockoutSchema);

export default Stockout;
