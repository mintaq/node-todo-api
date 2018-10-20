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

   //deleteMany
   db.collection('Todos').deleteMany({
      text: 'Code Java'
   }).then((results) => {
      console.log(results);
   });

   //deleteOne
   db.collection('Todos').deleteOne({
      text: 'Eat Dinner'
   }).then((results) => {
      console.log(results);
   });

   //findOneAndDelete
   db.collection('Users').findOneAndDelete({
      _id: new ObjectID("5b8e4baf45195052c4eb85b1")
   }).then((results) => {
      console.log(JSON.stringify(results, undefined, 3));
   });

   //client.close();
});