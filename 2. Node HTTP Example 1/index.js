const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req,res)=>{
    console.log("testing server");
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.end("<html><head></head><body><H1>Hello, World!</H1></body></html>");
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});