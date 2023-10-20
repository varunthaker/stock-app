import mongoose from "mongoose";

const { Schema } = mongoose;

type StockInArray = {
  date: string;
  stockInQty: string;
  reference: string;
};

type StockOutArray = {
  date: string;
  stockOutQty: string;
  reference: string;
};

export interface StockDataType {
  stockIn: StockInArray[];
  stockOut: StockOutArray[];
}

const stockSchema = new Schema<StockDataType>({
  stockIn: [{ date: Date, stockInQty: Number, reference: String }],
  stockOut: [{ date: Date, stockOutQty: Number, reference: String }],
});
