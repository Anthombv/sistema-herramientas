import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente, Mascota } from "../../../models";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Método no permitido", success: false });
  }

  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID no proporcionado", success: false });
  }

  try {
    // Convertir el ID proporcionado a ObjectId
    const objectId = new mongoose.Types.ObjectId(id as string);

    // Buscar todos los clientes
    const clientes: Cliente[] = await ClientModel.find({}).lean();

    // Buscar la mascota dentro de los clientes
    let mascota: Mascota | null = null;
    let cliente: Cliente | null = null;

    for (const c of clientes) {
      // Transformar las mascotas para agregar `id` derivado de `_id`
      const mascotasTransformadas = c.mascotas.map((m: any) => ({
        ...m,
        id: m._id,
      }));

      // Actualizar las mascotas del cliente con las transformadas
      c.mascotas = mascotasTransformadas;

      // Buscar la mascota por `id`
      const found = mascotasTransformadas.find((m) => {
        const mascotaId = new mongoose.Types.ObjectId(m.id as string);
        return mascotaId.equals(objectId);
      });

      if (found) {
        mascota = found;
        cliente = c;
        break;
      }
    }

    if (!mascota || !cliente) {
      return res
        .status(404)
        .json({ message: "Mascota no encontrada", success: false });
    }

    return res.status(200).json({
      message: "Mascota encontrada",
      success: true,
      data: { mascota, cliente },
    });
  } catch (error) {
    console.error("Error al buscar la mascota:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
}
