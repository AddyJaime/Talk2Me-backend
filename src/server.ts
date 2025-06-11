import "dotenv/config";
import express from "express";
import sequelize from "@config/database";
import { authRoutes } from "@routes";
import { conversationRoutes } from "@routes";
import { userRoutes } from "./routes/userRoutes";



// import { createServer } from "http";
// import { Server } from "socket.io";
// import { sockerConversation } from "./ws/conversationWebSocket";

const app = express();

// const httpServer = createServer(app);
// const io = new Server(httpServer);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/conversations", conversationRoutes)
app.use("/users", userRoutes)


const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅  connected to PostgresSQL", process.env.DB_NAME);

		await sequelize.sync({ force: false });
		console.log(" ✅  Models synced");


		// io.on("connection", (socket) => {
		// 	console.log("user connected", socket.id);
		// 	sockerConversation(io, socket)


		// 	socket.on("desconect", () => {
		// 		console.log("user connected", socket.id);
		// 	})


		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () =>
			console.log(`🚀 Server running in  http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log("❌ Error connecting to the database", error);
	}
};

startServer();

