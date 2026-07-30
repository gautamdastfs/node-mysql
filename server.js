import "dotenv/config";
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import { createUserTable } from "./src/models/userModel.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await createUserTable();
    console.log('✅ Database table "users" is ready.');
  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  }
});
