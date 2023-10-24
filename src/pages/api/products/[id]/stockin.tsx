import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../db/connect";
import Product from "../../../../../db/model/Product";
import Stockin from "../../../../../db/model/Stockin";

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
      const newStockInEntry = await Stockin.create(request.body);
      await Product.findByIdAndUpdate(
        id,
        { $push: { stockins: newStockInEntry._id } },
        { new: true }
      );
      response.status(200).json({ status: "StockIn created" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).json({ message: "Error in Stockins", error });
      }
    }
  }
}
