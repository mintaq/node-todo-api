require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./../server/middleware/authenticate');

var app = express();
const port = process.env.PORT;

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
      res.status(400).send(e);
   })
});

//POST /users
app.post('/users', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);
   var user = new User(body);

   user.save().then(() => {
      return user.generateAuthToken();
      //res.send(user);
   }).then((token) => {
      res.header('x-auth', token).send(user);
   }).catch((e) => {
      res.status(400).send(e);
   })
});

app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);

   User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
         res.header('x-auth', token).send(user);
      });
   }).catch ((e) => {
      res.status(400).send(e);
   })
});

app.delete('/users/me/token', authenticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
      res.status(200).send();
   }, () => {
      res.status(400).send();
   })
});

app.listen(port, () => {
   console.log(`Started up at port ${port}`);
});

module.exports = { app };
