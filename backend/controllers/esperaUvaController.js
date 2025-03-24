const sql = require("mssql");
const { emitirDatosActualizados } = require("../server");

const getEsperaUva = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM espera_uva");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los datos de frío" });
  }
};

const addEsperaUva = async (req, res) => {
  const { PALET, ESPERA, TOTAL } = req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO frio_uva (PALET, ESPERA, TOTAL)
      VALUES (@PALET, @ESPERA, @TOTAL)
    `;

    await pool
      .request()
      .input("PALET", sql.VarChar, PALET)
      .input("ESPERA", sql.VarChar, ESPERA)
      .input("TOTAL)", sql.VarChar, TOTAL)
      .query(query);

    // Emitir datos actualizados de la tabla "frio_uva"
    await emitirDatosActualizados("espera_uva");

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getEsperaUva, addEsperaUva };

/*

const { sql } = require("../db");

const getEsperaUva = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM espera_uva"); // Ajusta la consulta si es necesario
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error obteniendo datos de espera:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
};

module.exports = { getEsperaUva };

*/
