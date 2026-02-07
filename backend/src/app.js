import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));

// Body parser
app.use(express.json({ limit: "10kb" }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api", routes);

// Global error handler
app.use(errorMiddleware);

export default app;
