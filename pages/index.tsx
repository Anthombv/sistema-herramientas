/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import Router from "next/router";
import { useAuth } from "../controllers/hooks/use_auth";
import { useState } from "react";
import GeneralReportModal from "./components/modals/reportPagos";
import { CheckPermissions } from "../controllers/utils/check_permissions";
import { toast } from "react-toastify";
import ReportPagos from "./components/modals/reportPagos";
import ReportVentas from "./components/modals/reportVentas";

export default function Home() {
  const { auth } = useAuth();
  const [modalVisiblePagos, setModalVisiblePagos] = useState<boolean>(false);
  const [modalVisibleVentas, setModalVisibleVentas] = useState<boolean>(false);

  const showModalPagos = () => setModalVisiblePagos(true);
  const showModalVentas = () => setModalVisibleVentas(true);

  const handleSolcitude = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/solicitudes")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleHerramientas = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/herramientas")
      : toast.error("No tienes permiso para entrar aqui");
  };

  return (
    <>
      <div className="flex h-full bg-blue-100">
        <div className="flex-1 p-6">
          <div className="bg-white w-full rounded-xl shadow-2xl p-8 mb-8">
            <div className="flex items-center mb-8">
              <p className="text-3xl text-center text-blue-800 font-bold w-full">
                <strong>Sistema de Gestión de herramientas</strong>
              </p>
              <hr className="mt-4 mb-6 border-t-2 border-blue-300" />
            </div>

            {/* Modulos de Gestión */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Pagos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Solicitudes
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSolcitude}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver solicitudes realizadas
                  </button>
                </div>
              </div>

              {/* Productos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Herramientas
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleHerramientas}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver herramientas
                  </button>
                </div>
              </div>

              {/* Configuracion */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Configuracion
                </h2>
                <div className="flex flex-col gap-3">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Ir a Configuracion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReportPagos
        visible={modalVisiblePagos}
        close={() => {
          setModalVisiblePagos(null);
        }}
      />

      <ReportVentas
        visible={modalVisibleVentas}
        close={() => {
          setModalVisibleVentas(null);
        }}
      />
    </>
  );
}
