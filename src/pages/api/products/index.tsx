import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/connect";
import Product from "../../../../db/model/Product";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();
  if (request.method === "GET") {
    const products = await Product.find();
    response.status(200).json(products);
  } else {
    response.status(404).json({ message: "Product Not Found" });
  }
}
