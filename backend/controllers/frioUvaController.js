const sql = require("mssql");
const { emitirDatosActualizados } = require("../server");

const getFrioUva = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM frio_uva");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los datos de frío" });
  }
};

const addFrioUva = async (req, res) => {
  const { PALET, ESPERA, PALET_U, ENFRIANDO, TOTAL } = req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO frio_uva (PALET, ESPERA, PALET_U,ENFRIANDO,TOTAL)
      VALUES (@PALET, @ESPERA, @PALET_U, @ENFRIANDO, @TOTAL)
    `;

    await pool
      .request()
      .input("PALET", sql.VarChar, PALET)
      .input("ESPERA", sql.VarChar, ESPERA)
      .input("PALET_U", sql.VarChar, PALET_U)
      .input("ENFRIANDO", sql.VarChar, ENFRIANDO)
      .input("TOTAL", sql.VarChar, TOTAL)
      .query(query);

    // Emitir datos actualizados de la tabla "frio_uva"
    await emitirDatosActualizados("frio_uva");

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getFrioUva, addFrioUva };

/*

const sql = require("mssql");

const getFrioUva = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM frio_uva"); // Ajusta la consulta según tu base de datos

    res.json(result.recordset);
  } catch (error) {
    console.error("Error obteniendo datos de frío:", error);
    res.status(500).json({ error: "Error obteniendo los datos de frío" });
  }
};

module.exports = { getFrioUva }; // ✅ Exportando correctamente
*/
