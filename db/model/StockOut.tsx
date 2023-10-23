import mongoose from "mongoose";

const { Schema } = mongoose;

export type StockOutArray = {
  date: string;
  stockOutQty: Number;
  reference: string;
};

const stockoutSchema = new Schema<StockOutArray>({
  date: String,
  stockOutQty: Number,
  reference: String,
});

const Stockout =
  mongoose.models.Stockout || mongoose.model("Stockout", stockoutSchema);

export default Stockout;
