const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { connectDB } = require("./db");
const sql = require("mssql"); // Asegúrate de tener esta importación

const app = express();
const server = http.createServer(app);

// Configuración WebSocket para producción
const io = new Server(server, {
  cors: {
    origin: [
      "https://tudominio-frontend.com", // URL de tu frontend en producción
      "https://santaazul.onrender.com", // URL de tu frontend si también está en Render
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000, // 60 segundos (para evitar desconexiones en Render)
  pingInterval: 25000, // 25 segundos
});

const PORT = process.env.PORT || 10000; // Render usa el puerto 10000

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://tudominio-frontend.com",
    credentials: true,
  })
);

// Conexión mejorada a la base de datos
const emitirDatosActualizados = async (tabla) => {
  let pool;
  try {
    pool = await sql.connect(process.env.DB_CONFIG);
    const result = await pool.request().query(`SELECT * FROM ${tabla}`);
    io.emit(`actualizarDatos:${tabla}`, result.recordset); // Eventos específicos por tabla
  } catch (error) {
    console.error(`Error obteniendo datos de ${tabla}:`, error);
    // Reconexión automática en caso de error
    setTimeout(() => emitirDatosActualizados(tabla), 5000);
  } finally {
    if (pool) pool.close();
  }
};

// Inicio del servidor optimizado
connectDB()
  .then(() => {
    // Rutas
    const routes = [
      require("./routes/esperaUvaRoutes"),
        require("./routes/frioUvaRoutes"),
        require("./routes/gasificadoUvaRoutes"),
        require("./routes/ordenesUvaRoutes"),
        require("./routes/ordenesUvaRoutes"),
      
        require("./routes/esperaRoutes"),
        require("./routes/frioRoutes"),
        require("./routes/gasificadoPreRoutes"),
        require("./routes/ordenesRoutes"),
        require("./routes/recepcionRoutes"),

      // ... otras rutas
    ];

    routes.forEach((route) => app.use(`/api/${route.basePath}`, route.router));

    // WebSocket events
    io.on("connection", (socket) => {
      console.log(`🟢 Cliente conectado: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`🔴 Cliente desconectado: ${socket.id}`);
      });

      // Manejo de errores
      socket.on("error", (err) => {
        console.error("Error en Socket.IO:", err);
      });
    });

    // Health check endpoint
    app.get("/health", (req, res) => {
      res
        .status(200)
        .json({ status: "OK", websockets: io.engine.clientsCount });
    });

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
      console.log(`🛰️  WebSockets disponibles en ws://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  });

// Exportaciones
module.exports = {
  io,
  emitirDatosActualizados,
  app, // Para testing
};
