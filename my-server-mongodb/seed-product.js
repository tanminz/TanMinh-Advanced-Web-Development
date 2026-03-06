/**
 * Exercise 62 & 63: Seed Product collection in FashionData
 * Images stored as URLs (fast load - no base64)
 * Run: node seed-product.js
 */
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');

const productDefs = [
  { name: "Hell Fire Two-Tone Flame Hoodie", price: 45, imageFile: "hell-fire-hoodie.png", sku: "SKU001" },
  { name: "Adidas Vintage Brown Cap với Embroidery", price: 35, imageFile: "adidas-cap.png", sku: "SKU002" },
  { name: "Polo Ralph Lauren Green Graphic Tee", price: 55, imageFile: "polo-ralph-lauren-green.png", sku: "SKU003" },
  { name: "Nike Patchwork Textured Hoodie Yellow Blue", price: 65, imageFile: "nike-patchwork-hoodie.png", sku: "SKU004" },
  { name: "Tiger Spirit Long-Sleeve T-Shirt", price: 42, imageFile: "tiger-spirit-tee.png", sku: "SKU005" },
  { name: "Hoodie Tay và Mắt Đỏ Đô Xám", price: 58, imageFile: "hands-eyes-hoodie.png", sku: "SKU006" },
  { name: "Tokyo Shibuya 1955 Bomber Jacket", price: 95, imageFile: "tokyo-shibuya-jacket.png", sku: "SKU007" },
  { name: "Fever Dream Distressed Blue Jacket", price: 88, imageFile: "fever-dream-jacket.png", sku: "SKU008" },
  { name: "Black Motorcycle Flame Baseball Cap", price: 38, imageFile: "motorcycle-flames-cap.png", sku: "SKU009" },
  { name: "404 Error Glitch Art Baseball Cap", price: 42, imageFile: "error-glitch-cap.png", sku: "SKU010" }
];

const products = productDefs.map(p => ({
  _id: new ObjectId(),
  name: p.name,
  price: p.price,
  image: '/assets/products/' + p.imageFile,
  sku: p.sku
}));

async function seed() {
  try {
    await client.connect();
    const db = client.db('FashionData');
    const coll = db.collection('Product');
    await coll.deleteMany({});
    await coll.insertMany(products);
    console.log('Product collection seeded:', products.length, 'products');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
