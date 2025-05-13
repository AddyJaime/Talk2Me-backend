import "dotenv/config";
import express from "express";
import sequelize from "@config/database";
// importar con @ aunque en ts conf este el index 
// el alias en ts conf viene siendo model no index 
// si quiero acceder a todo los archis dentro de models entonces voy a tener que hacer algo como esto en ts config models/*
import "@models";
import { authRoutes } from "@routes";
import { friendshipRoutes } from "@routes";


const app = express();

// Para poder interpreter json
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/friends", friendshipRoutes)


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
