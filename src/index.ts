import "dotenv/config";

import { connectDatabase } from "./config/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
