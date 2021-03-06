// const MongoClient = require('mongodb').MongoClient;
const {
   MongoClient,
   ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   if (err) {
      return console.log('Unable to connect to MongoDB server');
   }
   console.log('Connected to MongoDB server');
   const db = client.db('TodoApp');

   db.collection('Todos').insertOne({
      text: 'Something to do',
      completed: false
   }, (err, result) => {
      if (err) {
         return console.log('Unable to insert Todo', err);
      }

      console.log(JSON.stringify(result.ops, undefined, 3));
   });

   // db.collection('Users').insertOne({
   //    name: 'Minh',
   //    age: 21,
   //    location: 'Vietnam'
   // }, (err, result) => {
   //    if (err) {
   //       return console.log('Unable to insert Users', err);
   //    }

   //    console.log(result.ops[0]._id.getTimestamp());
   // });

   client.close();
});