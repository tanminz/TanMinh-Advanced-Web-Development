/**
 * Exercise 61: Seed User collection in FashionData
 * Run: node seed-user.js
 */
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');

async function seed() {
  try {
    await client.connect();
    const db = client.db('FashionData');
    const userCollection = db.collection('User');
    const users = [
      { username: 'tranduythanh', password: '123456' },
      { username: 'admin', password: 'admin123' },
      { username: 'test', password: 'test123' }
    ];
    await userCollection.deleteMany({});
    await userCollection.insertMany(users);
    console.log('User collection seeded:', users.length, 'users');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
