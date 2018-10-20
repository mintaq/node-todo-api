const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
//    console.log(result);
// });

// Todo.findOneAndRemove()
// Tod.findbyIdAndRemove()

Todo.findByIdAndRemove('5bc94b86d8e5834eed8be5cd').then((todo) => {
   console.log(todo);
});