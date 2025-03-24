import { motion } from "framer-motion";

const TablaFrioUva = ({ data }) => {
  const cantidadEnEspera = data.filter((row) => row.ESPERA > 0).length;
  const cantidadFrio = data.filter((row) => row.ENFRIANDO > 0).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-4"
    >
      {/* Tabla 1: Espera Frío */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto bg-white rounded-xl p-6"
      >
        <div className="mb-2 text-center font-bold text-lg text-blue-700">
          ESPERA FRÍO ARANDANO {cantidadEnEspera}
        </div>
        <table className="w-full text-lg rounded-lg shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
              <th className="px-4 py-2  font-semibold">PALET</th>
              <th className="px-4 py-2  font-semibold">ESPERA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                className="border-b border-gray-200 transition duration-200 hover:shadow-md"
              >
                <td className="px-4 py-2 text-center">{row.PALET}</td>
                <td className="px-4 py-2 text-center">{row.ESPERA}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Tabla 2: ENFRIANDO ARANDANO */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto bg-white rounded-xl  p-6"
      >
        <div className="mb-2 text-center font-bold text-lg text-blue-700">
          ENFRIANDO ARANDANO {cantidadFrio}
        </div>
        <table className="w-full text-lg rounded-lg shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
              <th className="px-4 py-2  font-semibold">PALET</th>
              <th className="px-4 py-2  font-semibold">ENFRIANDO</th>
              <th className="px-4 py-2  font-semibold">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                className="border-b border-gray-200 transition duration-200 hover:shadow-md"
              >
                <td className="px-4 py-2 text-center">{row.PALET_U}</td>
                <td className="px-4 py-2 text-center">{row.ENFRIANDO}</td>
                <td className="px-4 py-2 text-center">{row.TOTAL}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default TablaFrioUva;
