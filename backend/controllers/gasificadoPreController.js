const sql = require("mssql");
const { emitirDatosActualizados } = require("../server");

const getGasificadoPre = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM GASIFICADO_PRE");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los datos de frío" });
  }
};

const addGasificadoPre = async (req, res) => {
  const { PALET, ESPERA, PALET_U, ENFRIANDO, TOTAL } = req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO frio_uva (PALET, ESPERA, PALET_U,ENFRIANDO,TOTAL)
      VALUES (@PALET, @ESPERA, @PALET_U,@ENFRIANDO,@TOTAL)
      
    `;

    await pool
      .request()
      .input("PALET", sql.VarChar, PALET)
      .input("ESPERA", sql.VarChar, ESPERA)
      .input("PALET_U", sql.VarChar, PALET_U)
      .input("ENFRIANDO", sql.VarChar, ENFRIANDO)
      .input("TOTAL)", sql.VarChar, TOTAL)
      .query(query);

    // Emitir datos actualizados de la tabla "frio_uva"
    await emitirDatosActualizados("gasificado_pre");

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getGasificadoPre, addGasificadoPre };

/*
const { sql } = require("../db"); // Importa la conexión

const getGasificadoPre = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM gasificado_pre");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error obteniendo datos de gasificado_pre:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
};

module.exports = { getGasificadoPre }; // 🔥 EXPORTA BIEN la función
*/
