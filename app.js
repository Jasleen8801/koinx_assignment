import express from "express";
import dotenv from "dotenv";
import tradeRoutes from "./routes/trade.route.js";

const app = express();

app.use(express.json());

dotenv.config();

// Routes
app.use("/api/trades", tradeRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Trade API");
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode: statusCode,
  })
})

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`);
});