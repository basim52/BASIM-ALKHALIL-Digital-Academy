import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { registerRoutes } from "./src/server/routes";

const logToFile = (msg: string) => console.log(`[Server] ${msg}`);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));
  const server = createServer(app);
  const wss = new WebSocketServer({ noServer: true });
  const PORT = 3000;

  server.on('upgrade', (request, socket, head) => {
    const rawUrl = request.url || '';
    const pathname = rawUrl.split('?')[0];
    
    logToFile(`Upgrade request for pathname: ${pathname} from ${request.headers.origin || 'unknown'}`);
    
    if (pathname === '/ws/live' || pathname === '/ws/live/') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // Register all shared routes (shared between server.ts and Vercel api/index.ts)
  registerRoutes(app, wss);

  // Global API error handler ensuring JSON responses for all API calls
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith('/api/') || (req.originalUrl && req.originalUrl.startsWith('/api/'))) {
      logToFile(`[API Error] ${req.method} ${req.originalUrl || req.path}: ${err.message}`);
      if (res.headersSent) {
        return next(err);
      }
      return res.status(err.status || err.statusCode || 500).json({
        error: err.name || "SERVER_ERROR",
        message: err.message || "An unexpected error occurred"
      });
    }
    next(err);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
