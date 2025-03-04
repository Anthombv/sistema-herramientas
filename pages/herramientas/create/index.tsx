/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Herramienta, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useState } from "react";

export const HerramientasCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, _setInitialValues] = useState<Herramienta>({
    nombre: "",
    codigo: "",
    descripcion: "",
    serie: "",
    modelo: "",
    marca: "",
    NParte: "",
    ubicacion: "",
    estado: "",
    imagen: "",
    tipo: "",
    cantidad: 0,
    observacion: "",
    calibracion: "",
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    return response.json(); // Devuelve la URL del archivo guardado localmente
  };

  const formik = useFormik<Herramienta>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData) => {
      setLoading(true);

      console.log(formData);

      if (formData.nombre === "") {
        toast.warning("Ingrese el nombre de la herramienta");
        return;
      }

      if (formData.tipo === "") {
        toast.warning("Ingrese el tipo de la herramienta");
        return;
      }

      //if (formik.values.imagen) {
      //  try {
      //    const uploadResult = await uploadImage(formik.values.imagen);
      //    formData.imagen = uploadResult.url; // Guardamos la URL local en el form
      //  } catch (error) {
      //    toast.error("Error subiendo la imagen");
      //    setLoading(false);
      //    return;
      //  }
      //}

      const response: ResponseData = await HttpClient(
        `/api/herramientas`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );

      if (response.success) {
        toast.success("Producto creado correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  return (
    <>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear herramienta
              </p>

              <div className="grid grid-cols-3 gap-4 px-4 py-2">
                <div>
                  <label>Nombre de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Nombre de la herramienta"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Codigo de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Codigo de la herramienta"
                    name="codigo"
                    value={formik.values.codigo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Descripcion de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Descripcion de la herramienta"
                    name="descripcion"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Serie de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Serie de la herramienta"
                    name="serie"
                    value={formik.values.serie}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Modelo de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Modelo de la herramienta"
                    name="modelo"
                    value={formik.values.modelo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Marca de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Marca de la herramienta"
                    name="marca"
                    value={formik.values.marca}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Numero de parte</label>
                  <input
                    type="text"
                    placeholder="Numero de parte de la herramienta"
                    name="NParte"
                    value={formik.values.NParte}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Ubicacion de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Ubicacion de la herramienta"
                    name="ubicacion"
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Estado de la herramienta</label>
                  <select
                    name="estado"
                    value={formik.values.estado}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="Disponible">Disponible</option>
                    <option value="En uso">En uso</option>
                  </select>
                </div>
                <div>
                  <label>Tipo de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Tipo de la herramienta"
                    name="tipo"
                    value={formik.values.tipo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Cantidad de la herramienta</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formik.values.cantidad}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Observacion de la herramienta</label>
                  <input
                    type="text"
                    placeholder="Observacion de la herramienta"
                    name="observacion"
                    value={formik.values.observacion}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Imagen de la herramienta</label>
                  <input
                    type="file"
                    name="imagen"
                    accept="image/*, application/pdf"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        const file = event.currentTarget.files[0];
                        formik.setFieldValue("imagen", file);
                      }
                    }}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Button
                  className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-3 text-center mx-5 mb-5 mt-5 dark:focus:ring-blue-900"
                  onClick={() => formik.handleSubmit()}
                >
                  Guardar herramienta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HerramientasCreate;
