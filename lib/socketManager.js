const { io } = require("socket.io-client");

const socket = io("http://127.0.0.1:5328");

export default socket;