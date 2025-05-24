import "dotenv/config";
import express from "express";
import sequelize from "@config/database";
import { authRoutes } from "@routes";
import { conversationRoutes } from "@routes";


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/conversations", conversationRoutes)


const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅  connected to PostgresSQL", process.env.DB_NAME);

		await sequelize.sync({ force: false });
		console.log(" ✅  Models synced");

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () =>
			console.log(`🚀 Server running in  http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log("❌ Error connecting to the database", error);
	}
};

startServer();
