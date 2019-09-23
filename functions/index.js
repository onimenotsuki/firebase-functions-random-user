const functions = require('firebase-functions');
// const faker = require('faker');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const db = admin.firestore();

// app.get('/populate/:numberOfEntries', (req, res) => {
//   const { numberOfEntries } = req.params;
//   const users = db.collection('users');

//   for (let i = 0; i < numberOfEntries; i++) {
//     let docRef = users.doc(faker.random.uuid());

//     let setData = docRef.set({
//       first: faker.name.firstName(),
//       last: faker.name.lastName(),
//       email: faker.internet.email(),
//       address: faker.address.streetAddress(),
//       city: faker.address.city(),
//       phone: faker.phone.phoneNumber(),
//       username: faker.internet.userName(),
//       avatar: faker.image.avatar(),
//     });
//   }

//   res.send(`Se crearon ${numberOfEntries} usuarios en la base de datos`);
// });

app.get('/', async (req, res) => {
  const usersCollection = db.collection('users');
  const users = await usersCollection.get();
  // const first = req.query.first;
  // const last = req.query.last;
  let usersArray = [];

  users.forEach(doc => usersArray.push(doc.data()));
  const id = Math.floor(Math.random() * (usersArray.length - 1));

  const arrayOfKeys = Object.keys(req.query);

  let newObj = new Object();

  for (let element of arrayOfKeys) {
    newObj[element.toString()] = usersArray[id][element];
  }

  res.json(newObj);
});

app.get('/', (req, res) => res.send('Hello world'));

exports.helloWorld = functions.https.onRequest(app);
