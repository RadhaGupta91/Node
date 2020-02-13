const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;


const app = express();
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
  res.statusCode = 200;
  res.header = "text/plain";
  next();
});

app.get('/dishes',(req,res,next)=>{
  res.end("Will send all the dishes to you!");
});

app.post('/dishes',(req,res,next)=>{
  console.log(req.body);
  res.end("We will add the dish : "+ req.body.name+" with details: "+req.body.description);
})

app.put('/dishes',(req,res,next)=>{
  res.end("PUT operation not supported on /dishes");
});

app.delete('/dishes',(req,res,next)=>{
  res.end("We will delete all the dishes");
});

app.get('/dishes/:dishId',(req,res,next)=>{
  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name +  ' with details: ' + req.body.description);
});

app.delete('/dishes',(req,res,next)=>{
  res.end("We will add the dish : "+ req.params.id);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish: ' + req.params.dishId);
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});