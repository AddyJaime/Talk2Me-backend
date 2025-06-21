import "dotenv/config";
import express from "express";
import sequelize from "@config/database";
import { authRoutes } from "@routes";
import { conversationRoutes } from "@routes";
import { userRoutes } from "./routes/userRoutes";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app)

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	}

})


// check thiss out later enum
// enum SOCKET_EVENT  {
// 	NEW_MESSAGE = "new_Message"
// }
// SOCKET_EVENT.NEW_MESSAGE

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`)

	socket.on('New_Message', (message) => {
		io.emit('receive_message', message)
	})
	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`)
	})
})



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




		const PORT = process.env.PORT || 3000;
		server.listen(PORT, () =>
			console.log(`🚀 Server running in  http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log("❌ Error connecting to the database", error);
	}
};

startServer();

