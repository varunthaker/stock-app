import mongoose from "mongoose";

const { Schema } = mongoose;

export type StockInArray = {
  date: String;
  stockInQty: Number;
  reference: string;
};

const stockInSchema = new Schema<StockInArray>({
  date: String,
  stockInQty: Number,
  reference: String,
});

const StokcIn =
  mongoose.models.StockIn || mongoose.model("StockIn", stockInSchema);

export default StokcIn;
