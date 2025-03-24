const sql = require("mssql");
const { io } = require("../server");

const getOrdenesUva = async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query("SELECT * FROM ordenes_uva");
    res.json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obteniendo los datos de órdenes Uva" });
  }
};

const addOrdenesUva = async (req, res) => {
  const { Orden, Prioridad, Destino, Presentacion, Ejec_proy, F_Despacho } =
    req.body; // Ajusta los campos según tu tabla

  try {
    const pool = await sql.connect(process.env.DB_CONFIG);

    // Insertar un nuevo registro
    const query = `
      INSERT INTO ordenes_uva (Orden, Prioridad, Destino,Presentacion,Ejec_proy,F_Despacho)
      VALUES (@Orden, @Prioridad, @Destino,@Presentacion,@Ejec_proy,@F_Despacho)
    `;

    await pool
      .request()
      .input("Orden", sql.VarChar, Orden)
      .input("Prioridad", sql.VarChar, Prioridad)
      .input("Destino", sql.VarChar, Destino)
      .input("Presentacion", sql.VarChar, Presentacion)
      .input("Ejec_proy", sql.VarChar, Ejec_proy)
      .input("F_Despacho", sql.VarChar, F_Despacho)
      .query(query);

    // Emitir el evento "actualizarDatos" con el nuevo registro
    io.emit("actualizarDatos", {
      tabla: "ordenes_uva",
      nuevoRegistro: {
        Orden,
        Prioridad,
        Destino,
        Presentacion,
        Ejec_proy,
        F_Despacho,
      },
    });

    res.status(201).json({ message: "Registro agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error agregando el registro" });
  }
};

module.exports = { getOrdenesUva, addOrdenesUva }; // Exportar ambas funciones
/*
const sql = require("mssql");

// Obtener todas las órdenes
const getOrdenesUva = async (req, res) => {
  try {
    const result =
      await sql.query`SELECT * FROM ordenes_uva ORDER BY F_despacho DESC`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo datos" });
  }
};

// Agregar una orden
const addOrdenUva = async (req, res) => {
  const { Prioridad, Destino, Presentacion, Ejec_proy, F_Despacho } = req.body;
  try {
    await sql.query`
      INSERT INTO ordenes_uva (Prioridad, Destino, Presentacion, Ejec_proy, F_despacho)
      VALUES (${Prioridad}, ${Destino}, ${Presentacion}, ${Ejec_proy}, ${F_Despacho})`;
    res.status(201).json({ message: "Orden agregada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error insertando datos" });
  }
};

module.exports = { getOrdenesUva, addOrdenUva };
*/
