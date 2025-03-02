import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { clienteId, mascotaId } = req.query;

      // Validar parámetros
      if (!clienteId || !mascotaId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "ClienteId y MascotaId son requeridos",
          });
      }

      // Buscar cliente por ID
      const cliente = await ClientModel.findById(clienteId);

      if (!cliente) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente no encontrado" });
      }

      // Buscar mascota específica dentro de las mascotas del cliente
      const mascota = cliente.mascotas.find((m) => m.id === mascotaId);

      if (!mascota) {
        return res
          .status(404)
          .json({ success: false, message: "Mascota no encontrada" });
      }

      // Devolver los datos de la mascota
      return res.status(200).json({ success: true, data: mascota });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en la API:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
}
