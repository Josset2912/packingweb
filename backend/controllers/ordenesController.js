const sql = require("mssql");
const { io } = require("../server");

const getOrdenes = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM ordenes");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los datos de órdenes" });
  }
};

const addOrdenes = async (req, res) => {
  const { ORDENES, PRIORIDAD, DESTINO, PRESENTACION, EJEC_PROY, F_DESPACHO } =
    req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO ordenes (ORDENES, PRIORIDAD, DESTINO,PRESENTACION,EJEC_PROY,F_DESPACHO)
      VALUES (@ORDENES, @PRIORIDAD, @DESTINO,@PRESENTACION,@EJEC_PROY,@F_DESPACHO)
    `;

    await pool
      .request()
      .input("ORDENES", sql.VarChar, ORDENES)
      .input("PRIORIDAD", sql.VarChar, PRIORIDAD)
      .input("DESTINO", sql.VarChar, DESTINO)
      .input("PRESENTACION", sql.VarChar, PRESENTACION)
      .input("EJEC_PROY", sql.VarChar, EJEC_PROY)
      .input("F_DESPACHO", sql.VarChar, F_DESPACHO)

      .query(query);

    // Emitir el evento "actualizarDatos" con el nuevo registro
    io.emit("actualizarDatos", {
      tabla: "ordenes",
      nuevoRegistro: {
        ORDENES,
        PRIORIDAD,
        DESTINO,
        PRESENTACION,
        EJEC_PROY,
        F_DESPACHO,
      },
    });

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getOrdenes, addOrdenes }; // Exportar ambas funciones
/*
const sql = require("mssql");

// Obtener todas las órdenes
const getOrdenes = async (req, res) => {
  try {
    const result =
      await sql.query`SELECT * FROM Ordenes ORDER BY F_despacho DESC`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo datos" });
  }
};

// Agregar una orden
const addOrden = async (req, res) => {
  const { PRIORIDAD, DESTINO, PRESENTACION, EJEC_PROY, F_DESPACHO } = req.body;
  try {
    await sql.query`
      INSERT INTO Ordenes (Prioridad, Destino, Presentacion, Ejec_proy, F_despacho)
      VALUES (${PRIORIDAD}, ${DESTINO}, ${PRESENTACION}, ${EJEC_PROY}, ${F_DESPACHO})`;
    res.status(201).json({ message: "Orden agregada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error insertando datos" });
  }
};

module.exports = { getOrdenes, addOrden };
*/
