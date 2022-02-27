const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors());

const http = require('http').createServer(app)
app.use(express.json());

const pingRoutes = require("./api/ping/ping-routes");

app.use("/api/ping", pingRoutes);

const logger = require("./services/logger.service");
const port = 3030;
http.listen(port, () => {
    logger.info("Server is running on port: " + port);
});

console.log("I am Here!, am I?");






