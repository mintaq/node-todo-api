const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var userID = '5b95e6fa6c2a37246e3af48d';
// var id = '5ba6709047137348eca8bb7e11';

// if(!ObjectID.isValid(id)){
//    console.log('ID not valid');
// }

// Todo.find({
//    _id: id
// }).then((todos) => {
//    console.log('Todos', todos);
// });

// Todo.findOne({
//    _id: id
// }).then((todo) => {
//    console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//    if (!todo) {
//       return console.log('Id not found');
//    }
//    console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(userID).then((user) => {
   if (!user) {
      return console.log('Unable to find user');
   }

   console.log('User ', user);
}, (e) => {
   console.log(e);
})