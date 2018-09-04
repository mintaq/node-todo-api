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

   // db.collection('Todos').findOneAndUpdate({
   //    _id: new ObjectID('5b8e5f9605376b5cd7bc3692')
   // },{
   //    $set: {
   //       completed: true
   //    }
   // }, {
   //    returnOriginal: false
   // }).then((results) => {
   //    console.log(results);
   // })

   db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5b8caac9590d8823ee030ffc')
   }, {
      $set: {
         name: 'Gin'
      },
      $inc: {
         age: 1
      }
   }, {
      returnOriginal: false
   }).then((results) => {
      console.log(results);
   }, (err) => {
      console.log('WTF', err);
   });
   //client.close();
});