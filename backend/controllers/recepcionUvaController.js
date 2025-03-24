const sql = require("mssql");
const { emitirDatosActualizados } = require("../server");

const getRecepcionUva = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM recepcion_uva");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los datos de frío" });
  }
};

const addRecepcionUva = async (req, res) => {
  const { VAR, EJECUCION } = req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO RECEPCION (VAR,EJECUCION)
      VALUES (@VAR,@EJECUCION)
    `;

    await pool
      .request()
      .input("VAR", sql.VarChar, VAR)
      .input("EJECUCION", sql.VarChar, EJECUCION)
      .query(query);

    // Emitir datos actualizados de la tabla "frio_uva"
    await emitirDatosActualizados("recepcion_uva");

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getRecepcionUva, addRecepcionUva };

/*
const sql = require("mssql");

const getRecepcionUva = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM recepcion_uva`;

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo datos de recepción" });
  }
};

module.exports = { getRecepcionUva };
*/
