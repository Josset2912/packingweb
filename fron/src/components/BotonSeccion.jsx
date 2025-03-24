import { motion } from "framer-motion";

const BotonSeccion = ({
  selectedOption,
  selectedButton,
  setSelectedButton,
}) => {
  if (!selectedOption) return null;

  const botones =
    selectedOption === "Arándano"
      ? ["RECEPCIÓN", "GASIFICADO PRE FRÍO", "ESPERA", "FRIO", "ORDEN PRD"]
      : ["RECEPCIÓN", "GASIFICADO-VOLCADO", "ESPERA", "FRIO", "ORDEN PRD"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 p-4">
      {botones.map((nombre, index) => (
        <motion.button
          key={index}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg 
            ${
              selectedButton === nombre
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/50 scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
            }`}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedButton(nombre)}
        >
          {nombre}
        </motion.button>
      ))}
    </div>
  );
};

export default BotonSeccion;
