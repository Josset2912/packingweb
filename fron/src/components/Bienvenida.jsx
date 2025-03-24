import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Bienvenida = ({ onStart }) => {
  const [texto, setTexto] = useState("");
  const [index, setIndex] = useState(0);
  const textoCompleto = "Bienvenido a Santa Azul";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < textoCompleto.length) {
        setTexto((prevTexto) => prevTexto + textoCompleto[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setTimeout(() => {
          setTexto("");
          setIndex(0);
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-center p-6">
      <h1 className="mb-4 text-6xl md:text-7xl font-bold flex items-center gap-4">
        {texto}
        
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-6 text-lg md:text-3xl font-semibold"
      >
        Cultivamos con amor para llevar al mundo los mejores <br />
        arándanos, frescos y de sabor único.
      </motion.p>
      <motion.img
        src="/santa.webp"
        alt="Santa Azul"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-40 md:w-64 lg:w-80"
      />
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-400 transition"
      >
        Adelante 🚀
      </motion.button>
    </div>
  );
};

export default Bienvenida;
