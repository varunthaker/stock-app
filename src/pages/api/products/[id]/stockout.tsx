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
      const newStockOutEntry = await Stockout.create(request.body);
      await Product.findByIdAndUpdate(
        id,
        { $push: { stockouts: newStockOutEntry._id } },
        { new: true }
      );
      response.status(200).json({ status: "StockOut created" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).json({ message: "Error in Stockouts", error });
      }
    }
  }
}
