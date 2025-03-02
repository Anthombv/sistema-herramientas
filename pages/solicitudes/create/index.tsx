/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  Herramienta,
  HerramientaSeleccionada,
  ResponseData,
} from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useEffect, useState } from "react";
import FormatedDate from "../../../controllers/utils/formated_date";

export const VentasCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clienteSearch, setClienteSearch] = useState("");
  const [productos, setProductos] = useState<Herramienta[]>([]);
  const [selectedProductos, setSelectedProductos] = useState<
    HerramientaSeleccionada[]
  >([]);
  const [productoSearch, setProductoSearch] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/herramientas",
      "GET",
      auth.usuario,
      auth.rol
    );
    setProductos(response.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const formik = useFormik<Herramienta>({
  //  enableReinitialize: true,
  //  validateOnMount: true,
  //  validateOnBlur: true,
  //  validateOnChange: true,
  //  initialValues,
  //  onSubmit: async (formData) => {
  //    setLoading(true);
//
  //    console.log(formData);
//
  //    const response: ResponseData = await HttpClient(
  //      `/api/solicitudes`,
  //      "POST",
  //      auth.usuario,
  //      auth.rol,
  //      formData
  //    );
//
  //    if (response.success) {
  //      toast.success("Solicitud creada correctamente!");
  //      Router.back();
  //    } else {
  //      toast.warning(response.message);
  //    }
//
  //    setLoading(false);
  //  },
  //});

  return (
    <>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-2 m-5 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-500 text-center mb-2">
              Crear Venta
            </h1>
            <p className="md:text-xl text-lg py-2 font-bold text-blue-500">
              Datos del cliente
            </p>

            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Datos de producto(s)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentasCreate;
