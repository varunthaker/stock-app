import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../db/connect";
import Product from "../../../../../db/model/Product";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  await dbConnect();
  if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ status: `Product ${id} succesfully deleted` });
  }

  if (request.method === "PATCH") {
    await Product.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json({ status: `Product ${id} updated` });
  }
}
