import mongoose from "mongoose";

const { Schema } = mongoose;

export type StockInArray = {
  date: String;
  stockInQty: Number;
  reference: string;
};

const stockinSchema = new Schema<StockInArray>({
  date: String,
  stockInQty: Number,
  reference: String,
});

const Stockin =
  mongoose.models?.Stockin || mongoose.model("Stockin", stockinSchema);

export default Stockin;
