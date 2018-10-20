const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   var todo = new Todo({
      text: req.body.text
   });

   todo.save().then((doc) => {
      res.send(doc);
   }, (err) => {
      res.status(400).send(err);
   });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
      res.send({ todos });
   }, (e) => {
      res.status(400).send(e);
   });
});

//GET /todos/123123
app.get('/todos/:id', (req, res) => {
   var id = req.params.id;

   //Valid id using isValid
   if (!ObjectID.isValid(id)) {
      return res.status(404).send();
   }

   //findById
   Todo.findById(id).then((todo) => {
      if (!todo) {
         return res.status(404).send();
      }

      res.send({ todo });
   }).catch((e) => {
      res.status(400).send();
   })
});

app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;

   if (!ObjectID.isValid(id)) {
      return res.status(404).send();
   }

   Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
         return res.status(404).send();
      }

      res.send({ todo });
   }).catch((e) => {
      res.status(400).send();
   });
});

app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'competed']);

   if (!ObjectID.isValid(id)) {
      return res.status(404).send();
   }

   if (_.isBoolean(body.compeleted) && body.compeleted) {
      body.compeletedAt = new Date().getTime();
   } else {
      body.compeleted = false;
      body.compeletedAt = null;
   }

   Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
      if (!todo) {
         return res.status(404).send();
      }

      res.send({ todo });
   }).catch((e) => {
      res.status(400).send();
   })
});

app.listen(port, () => {
   console.log(`Started up at port ${port}`);
});

module.exports = { app };
