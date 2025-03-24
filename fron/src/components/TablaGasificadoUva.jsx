const TablaGasificadoUva = ({ data }) => {
  const cantidadEnEspera = data.filter((row) => row.ESPERA > 0).length;
  const cantidadFrio = data.filter((row) => row.ESPERA_D > 0).length;
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tabla 1: ESPERA GASIFICADO ARÁNDANO */}
        <div className="w-full max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-6">
          <h2 className="mb-4 text-center font-bold text-xl md:text-2xl text-gray-700 uppercase tracking-wide">
            ESPERA GASIFICADO ARÁNDANO {cantidadEnEspera}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg md:text-xl">
                  <th className="px-6 py-4 text-center">PALET</th>
                  <th className="px-6 py-4 text-center">ESPERA</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-indigo-100 transition duration-200 text-lg md:text-xl"
                  >
                    <td className="px-6 py-4 text-center text-gray-800">
                      {row.PALET_U}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {row.ESPERA}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla 2: Espera Gasificado Post */}
        <div className="w-full max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-6">
          <h2 className="mb-4 text-center font-bold text-xl md:text-2xl text-gray-700 uppercase tracking-wide">
            ESPERA PRE FRÍO ARÁNDANO {cantidadFrio}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg md:text-xl">
                  <th className="px-6 py-4 text-center">PALET</th>
                  <th className="px-6 py-4 text-center">ESPERA</th>
                  <th className="px-6 py-4 text-center">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-teal-100 transition duration-200 text-lg md:text-xl"
                  >
                    <td className="px-6 py-4 text-center text-gray-800">
                      {row.PALET_D}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {row.ESPERA_D}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-900">
                      {row.TOTAL}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaGasificadoUva;
