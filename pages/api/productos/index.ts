import { NextApiRequest, NextApiResponse } from "next";
import update from "../../../controllers/mongo/productos/update";
import list from "../../../controllers/mongo/productos/list";
import dbConnect from "../../../database/connect/mongo";
import create from "../../../controllers/mongo/productos/create";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // connect to the database
    await dbConnect();

    switch (req.method) {
      case "GET":
        return await list(req, res);
      case "POST":
        return await create(req, res);
      case "PUT":
        return await update(req, res);
      default:
        throw new Error("Invalid method");
    }
  } catch (error) {
    console.error(error);
    // return the error
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
