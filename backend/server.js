const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { connectDB } = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://santaazul.orender.com", // Reemplaza con tu dominio frontend
    methods: ["GET", "POST"],
    credentials: true, // Si usas autenticación
  },
  transports: ["websocket", "polling"], // Asegura compatibilidad
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Función para emitir datos actualizados
const emitirDatosActualizados = async (tabla) => {
  try {
    const pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query(`SELECT * FROM ${tabla}`);
    io.emit("actualizarDatos", { tabla, datos: result.recordset });
  } catch (error) {
    console.error(`Error obteniendo datos de ${tabla}:`, error);
  }
};

// Conectar a la base de datos antes de iniciar el servidor
connectDB()
  .then(() => {
    // Importar rutas UVAS
    const esperaUvaRoutes = require("./routes/esperaUvaRoutes");
    const recepcionUvaRoutes = require("./routes/recepcionUvaRoutes");
    const gasificadoUvaRoutes = require("./routes/gasificadoUvaRoutes");
    const frioUvaRoutes = require("./routes/frioUvaRoutes");
    const ordenesUvaRoutes = require("./routes/ordenesUvaRoutes");

    // Importa las demás rutas aquí ARANDANO
    const ordenesRoutes = require("./routes/ordenesRoutes");
    const gasificadoPreRoutes = require("./routes/gasificadoPreRoutes");
    const esperaRoutes = require("./routes/esperaRoutes");
    const recepcionRoutes = require("./routes/recepcionRoutes");
    const frioRoutes = require("./routes/frioRoutes");

    // Agregar las rutas uvas
    app.use("/api/recepcion_uva", recepcionUvaRoutes);
    app.use("/api/gasificado_uva", gasificadoUvaRoutes);
    app.use("/api/espera_uva", esperaUvaRoutes);
    app.use("/api/frio_uva", frioUvaRoutes);
    app.use("/api/ordenes_uva", ordenesUvaRoutes);
    // Agrega las demás rutas aquí ARANDANO
    app.use("/api/ordenes", ordenesRoutes);
    app.use("/api/gasificado_pre", gasificadoPreRoutes);
    app.use("/api/espera", esperaRoutes);
    app.use("/api/recepcion", recepcionRoutes);
    app.use("/api/frio", frioRoutes);

    // Socket.io lógica
    io.on("connection", (socket) => {
      // Manejar desconexión
      socket.on("disconnect", () => {});
    });

    // Iniciar el servidor con socket.io
    server.listen(PORT, () => {});
  })
  .catch((error) => {});

// Exportar io y emitirDatosActualizados para usarlos en controladores
module.exports = { io, emitirDatosActualizados };
