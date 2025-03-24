import { useState, useEffect, lazy, Suspense } from "react";
import { io } from "socket.io-client"; // Importar WebSockets
import { motion } from "framer-motion";
import Bienvenida from "./components/Bienvenida";
import Header from "./components/Header";
import BotonSeccion from "./components/BotonSeccion";
import { fetchData } from "./utils/api";

// Lazy loading para componentes de tablas
const TablaRecepcionArandano = lazy(() =>
  import("./components/TablaRecepcionArandano")
);
const TablaGasificadoArandano = lazy(() =>
  import("./components/TablaGasificadoArandano")
);
const TablaEsperaArandano = lazy(() =>
  import("./components/TablaEsperaArandano")
);
const TablaFrioArandano = lazy(() => import("./components/TablaFrioArandano"));
const TablaOrdenesArandano = lazy(() =>
  import("./components/TablaOrdenesArandano")
);

const TablaRecepcionUva = lazy(() => import("./components/TablaRecepcionUva"));
const TablaGasificadoUva = lazy(() =>
  import("./components/TablaGasificadoUva")
);
const TablaEsperaUva = lazy(() => import("./components/TablaEsperaUva"));
const TablaFrioUva = lazy(() => import("./components/TablaFrioUva"));
const TablaOrdenesUva = lazy(() => import("./components/TablaOrdenesUva"));

// Conectar con WebSocket (retrasado hasta después del render inicial)
let socket;
const connectSocket = () => {
  socket = io("http://localhost:5000");
};

const App = () => {
  const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedButton || !selectedOption) return;

    const endpointMap = {
      Arándano: {
        "RECEPCIÓN": "recepcion",
        "GASIFICADO PRE FRÍO": "gasificado_pre",
        "ESPERA": "espera",
        "FRIO": "frio",
        "ORDEN PRD": "ordenes",
      },
      Uva: {
        "RECEPCIÓN": "recepcion_uva",
        "GASIFICADO-VOLCADO": "gasificado_uva",
        "ESPERA": "espera_uva",
        "FRIO": "frio_uva",
        "ORDEN PRD": "ordenes_uva",
      },
    };

    const endpoint = endpointMap[selectedOption]?.[selectedButton];
    if (!endpoint) return;

    const cargarDatos = async () => {
      setCargando(true);
      try {
        const response = await fetchData(endpoint);
        setData(response);
      } catch (error) {
        console.error(`Error cargando datos de ${endpoint}:`, error);
        setData([]);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();

    // Escuchar actualizaciones en tiempo real
    if (!socket) connectSocket(); // Conectar WebSocket si no está conectado
    socket.on("actualizarDatos", ({ tabla, datos }) => {
      console.log(
        `Datos actualizados recibidos para la tabla ${tabla}:`,
        datos
      );

      // Verificar si la tabla actualizada coincide con la seleccionada
      const endpoint = endpointMap[selectedOption]?.[selectedButton];
      if (endpoint && tabla === endpoint) {
        setData(datos); // Actualizar el estado con los nuevos datos
      }
    });

    return () => {
      if (socket) socket.off("actualizarDatos");
    };
  }, [selectedOption, selectedButton]);

  const renderMensajeBienvenida = () => {
    if (mostrarBienvenida) {
      return <Bienvenida onStart={() => setMostrarBienvenida(false)} />;
    }

    if (!selectedOption) {
      return (
        <div className="flex justify-center items-center min-h-[calc(80vh-80px)]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-8xl text-center"
          >
            "¡Bienvenido!{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              <br /> Elige una opción y empecemos.
            </span>
            "
          </motion.h1>
        </div>
      );
    }
    return null;
  };

  const renderTablas = () => {
    const tablaMap = {
      Arándano: {
        "RECEPCIÓN": TablaRecepcionArandano,
        "GASIFICADO PRE FRÍO": TablaGasificadoArandano,
        "ESPERA": TablaEsperaArandano,
        "FRIO": TablaFrioArandano,
        "ORDEN PRD": TablaOrdenesArandano,
      },
      Uva: {
        "RECEPCIÓN": TablaRecepcionUva,
        "GASIFICADO-VOLCADO": TablaGasificadoUva,
        "ESPERA": TablaEsperaUva,
        "FRIO": TablaFrioUva,
        "ORDEN PRD": TablaOrdenesUva,
      },
    };

    const ComponenteTabla = tablaMap[selectedOption]?.[selectedButton];
    return ComponenteTabla ? (
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Cargando datos...</p>
          </div>
        }
      >
        <ComponenteTabla data={data} />
      </Suspense>
    ) : null;
  };

  return (
    <>
      <Header
        logoSrc="/santa.png"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setSelectedButton={setSelectedButton}
      />
      {renderMensajeBienvenida()}
      <BotonSeccion
        selectedOption={selectedOption}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      {renderTablas()}
    </>
  );
};

export default App;
