const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const io = new Server({
	cors: {
		origin: "*",
	},
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
	console.log(`Socket connection id: ${socket.id}`);
});

app.post("/login", (req, res) => {
	const { username, password, token } = req.body;
	if (username === "test" && password === "test") {
		console.log("Valid Login");
		io.sockets.emit(token, {
			username: username,
		});
		res.status(200).send();
	} else {
		res.status(401).send();
	}
});

app.listen(80, () => {
	console.log("Connected!");
});

io.listen(3001);
