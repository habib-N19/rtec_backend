import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import {
  errorMiddleware,
  setupUnhandledExceptionHandlers,
} from "./api/middlewares/error.middleware.js";
import router from "./api/routes/index.js";
import { testConnection } from "./config/db.js";
import { config } from "./config/env.js";
import { httpLogger, logger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsDir = join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
setupUnhandledExceptionHandlers();

async function startServer() {
  try {
    await testConnection();
    const app = express();
    app.use(helmet());
    app.use(httpLogger);

    app.use(express.json({ limit: "10kb" }));
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));
    const allowedOrigins = config.ALLOWED_ORIGINS.split(",");
    app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
              "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
        credentials: true,
      }),
    );
    app.use("/api/v1", router);

    app.get("/health", (_, res: express.Response) => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      });
    });

    app.all("*", (req, res) => {
      res.status(404).json({
        status: "error",
        message: `Cannot find ${req.originalUrl} on this server!`,
      });
    });
    app.use(errorMiddleware);

    // Start server
    const PORT = config.PORT || 8000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
    });

    // Handle graceful shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      process.exit(0);
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT signal received: closing HTTP server");
      process.exit(0);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
// export default startServer;
