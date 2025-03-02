import { NextApiRequest, NextApiResponse } from "next";
import { Cliente } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, ClientModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = req.body;
  const userName = req.headers.username as string;

  if (client._id) {
    client.id = client._id;
  }

  const newSolicitude = (): Cliente => {
    return client;
  };

  console.log(client)
  console.log(client.id)
  console.log(userName)
  console.log(newSolicitude)

  const resp = await ClientModel.findOneAndUpdate(
    {
      _id: client.id,
    },
    newSolicitude()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al cliente:" + client.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Cliente no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Cliente editado",
    success: true,
  });
}
