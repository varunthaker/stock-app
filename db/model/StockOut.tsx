import mongoose from "mongoose";

const { Schema } = mongoose;

export type StockOutArray = {
  date: string;
  stockOutQty: Number;
  reference: string;
};

const stockOutSchema = new Schema<StockOutArray>({
  date: String,
  stockOutQty: Number,
  reference: String,
});

const StokcOut =
  mongoose.models.StockOut || mongoose.model("StockOut", stockOutSchema);

export default StokcOut;
