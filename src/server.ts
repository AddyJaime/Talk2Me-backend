import express from "express";
import sequelize from "@config/database";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.json({ message: "hello server" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running in  http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("❌ Error connecting to the database", error);
  }
};

startServer();
