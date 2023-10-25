import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../db/connect";
import Product from "../../../../../db/model/Product";
import Stockout from "../../../../../db/model/Stockout";

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
      // Creating new stockout entry
      const newStockOutEntry = await Stockout.create(request.body);
      await Product.findByIdAndUpdate(
        id,
        { $push: { stockouts: newStockOutEntry._id } },
        { new: true }
      );

      // Update Stock based o Stock-Out Qty
      const product = await Product.findById(id).populate("stockouts");
      const totalProductStock = product.stockQty;

      const stockOutEntries = product.stockouts;
      const stockOutEntriesLength = stockOutEntries.length;

      if (stockOutEntriesLength > 0) {
        const lasteAddedStockOutEntry =
          stockOutEntries[stockOutEntriesLength - 1];

        if (totalProductStock > lasteAddedStockOutEntry.stockOutQty) {
          const totalStockQty =
            totalProductStock - lasteAddedStockOutEntry.stockOutQty;
          product.stockQty = totalStockQty;
          await product.save();
        } else {
          console.log("Error in Subtraction ");
        }
      } else {
        console.log("Error in Stock Out");
      }

      response.status(200).json({ status: "StockOut created" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).json({ message: "Error in Stockouts", error });
      }
    }
  }
}
