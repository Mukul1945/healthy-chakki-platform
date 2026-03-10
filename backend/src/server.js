import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import { ensureAdminUser } from "./seed/adminUser.js";

import http from "http";
import { initSocket } from "./config/socket.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await ensureAdminUser();

  const server = http.createServer(app);
  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


start().catch((err) => {
  console.error(err);
  process.exit(1);
});
