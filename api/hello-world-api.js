//hello-world-api.js
//basic hello world api server
//
//requires: express, diskdb, body-parser
const express = require('express');
const db = require('diskdb');
const bodyParser = require('body-parser');

const server = express();
const defaultMsg = { message: "Hello world" };

//allows the request body to be prased
server.use(bodyParser.text({type: "*/*"}));

db.connect('./data', ['msg']);

if(!db.msg.find().length) {
  db.msg.save(defaultMsg);
}
console.log(db.msg.find()[0]);
console.log(db.msg.find()[0]._id);

// /hello-world/ always returns default message
server.get("/hello-world/", (req,res) => {
	res.json(defaultMsg);
});

//get message(s) from db
server.get("/hello-world/msg", (req,res) => {
  res.json(db.msg.find());
});

//post function to add message to db
server.post("/hello-world/msg", (req,res) => {
  var msg = { message: req.body }
  console.log('Adding message:', msg);
  db.msg.save(msg);
  res.json(db.msg.find());
});

const port = 80;
server.listen(port, () => {
	console.log(`Server listening at ${port}`);
});
