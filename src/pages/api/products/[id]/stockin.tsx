import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../db/connect";
import Product from "../../../../../db/model/Product";
import Stockin from "../../../../../db/model/Stockin";
import { StockInArray } from "../../../../../db/model/Stockin";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "PATCH") {
    try {
      dbConnect();
      //Creating new stockIn entry
      const newStockInEntry = await Stockin.create(request.body);
      await Product.findByIdAndUpdate(
        id,
        { $push: { stockins: newStockInEntry._id } },
        { new: true }
      );

      //Update Stock based on stock-in Qty
      const product = await Product.findById(id).populate("stockins");
      const totalProductStock = product.stockQty;

      const stockInEntries = product.stockins;
      const stockInEntriesLength = stockInEntries.length;

      if (stockInEntriesLength > 0) {
        const lastAddedStockInEntry = stockInEntries[stockInEntriesLength - 1];
        const totalStockQty =
          totalProductStock + lastAddedStockInEntry.stockInQty;
        product.stockQty = totalStockQty;
        await product.save();
      } else {
        return response
          .status(400)
          .json({ message: "Error in Stock Update to Stock Qty" });
      }

      return response
        .status(200)
        .json({ status: "StockIn created and stock Updated" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).json({ message: "Error in Stockin", error });
      }
    }
  }
}
