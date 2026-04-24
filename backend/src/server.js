const app = require("./app");
const { db } = require("./config/db");

// Test DB connection
db.query("SELECT 1")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});