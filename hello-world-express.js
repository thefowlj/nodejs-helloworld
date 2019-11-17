//hello-world-express.js
//basic hello world server using express
const express = require('express');
const server = express();

server.get("/json", (req,res) => {
	res.json({ message: "Hello world" });
});

const port = 80;
server.listen(port, () => {
	console.log(`Server listening at ${port}`);
});
