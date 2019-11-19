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

if(db.msg.find().length < 1) {
  db.msg.save(defaultMsg);
}
const defaultId = db.msg.find()[0]._id;
console.log(db.msg.find());
console.log("defaultId: ", db.msg.find()[0]._id);

// /hello-world/ always returns default message
server.get("/hello-world/", (req,res) => {
	res.json(db.msg.find({ _id: defaultId}));
});

//get message(s) from db
server.get("/hello-world/msg", (req,res) => {
  res.json(db.msg.find());
});

//post function to add message to db
server.post("/hello-world/msg", (req,res) => {
  var msg = { message: req.body };
  console.log('Adding message:', msg);
  db.msg.save(msg);
  res.json(db.msg.find());
});

//post function to update default message
server.post("/hello-world/", (req,res) => {
  var msg = { message: req.body };
  console.log("Updating default message:", msg);
  db.msg.update({ _id: defaultId }, msg);
  res.json(db.msg.find());
});

//delete function to remove message from db
server.delete("/hello-world/msg/:id", (req,res) => {
  var msgId = req.params.id;
  if(msgId !== defaultId) {
    console.log("Deleting message with id:", msgId);
    db.msg.remove({ _id: msgId});
  } else {
    console.log("Deletion failed: id equals default message id");
  }
  res.json(db.msg.find());
});

const port = 4001;
server.listen(port, () => {
	console.log(`Server listening at ${port}`);
});
