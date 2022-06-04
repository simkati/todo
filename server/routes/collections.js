const express = require("express");

// collectionsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /collection.
const collectionRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// This section will help you get a list of all the collections.
collectionRoutes.route("/collection").get(function (req, res) {
 let db_connect = dbo.getDb("todo");
 db_connect
   .collection("collection")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you create a new collection.
collectionRoutes.route("/collection/add").post(function (req, res) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   tasks: req.body.tasks,
 };
 db_connect.collection("collection").insertOne(myobj, function (err, result) {
   if (err) throw err;
   res.json(result);
 });
});

// This section will help you add a new task in collection.
collectionRoutes.route("/collection/addTask/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 let addtask = {
   $push: {
     "tasks": {
       name: req.body.name,
       complete: req.body.complete,
       tags: req.body.tags,
     }
  }
};
db_connect.collection("collection").updateOne(myquery, addtask, function (err, res) {
     if (err) throw err;
     response.json(res);
 });
});

// This section will help you update a task in collection.
collectionRoutes.route("/collection/taskupdate/:id/:index").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id ) };
 let key = "tasks." + req.params.index;
 let updatetask = {
   $set: {}
};
updatetask.$set[key] = req.body.task;
db_connect.collection("collection").updateOne(myquery, updatetask, function (err, res) {
     if (err) throw err;
     response.json(res);
 });
});

module.exports = collectionRoutes;
