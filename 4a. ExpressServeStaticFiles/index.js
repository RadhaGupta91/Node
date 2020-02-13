const express = require("express");
const http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;
const app = express();

app.use(morgan("dev")); // gives information of browser

app.use(express.static(__dirname + "/public")); //connect with public path

app.use((req, res) => {
    //console.log(req.headers);
    console.log(__dirname);
    console.log(__filename);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});