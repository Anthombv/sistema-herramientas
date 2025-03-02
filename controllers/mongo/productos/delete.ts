import { NextApiRequest, NextApiResponse } from "next";
import { AuditoryModel, ProductoModel } from "../../../database/schemas";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const userName = req.headers.username as string;
  const resp = await ProductoModel.findByIdAndRemove(id);
  //{ acknowledged: true, deletedCount: 1 }

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Elimino un producto: "+ resp.nombre,
  });
  await auditory.save();

  if (resp.deletedCount === 1)
    return res.status(200).json({
      message: "Eliminado!",
      success: true,
    });

  return res.status(500).json({
    message: "Error inesperado",
    success: false,
  });
}
