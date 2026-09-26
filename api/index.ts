import "dotenv/config";
import express from "express";
import { registerRoutes } from "../src/server/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all shared routes (matching local dev server.ts)
registerRoutes(app);

// Global error handler for Vercel Serverless
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("API Error Handling:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

export default app;
