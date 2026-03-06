const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
  secret: 'ex63-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

const { MongoClient } = require('mongodb');

const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();

const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");
const userCollection = database.collection("User");
const productCollection = database.collection("Product");

// Exercise 61: Login API - save cookie on success (giống Bài 60: create-cookie)
app.post("/auth/login", cors(), async (req, res) => {
  const username = req.body?.name || req.body?.username || "";
  const password = req.body?.password || "";
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }
  try {
    const user = await userCollection.findOne({ username: username });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    // Lưu cookie giống Bài 60 (create-cookie)
    res.cookie("username", username, { path: "/", maxAge: 86400000 });
    res.cookie("password", password, { path: "/", maxAge: 86400000 });
    const account = { username, password };
    res.cookie("account", account, { path: "/", maxAge: 86400000 });
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login err:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Read saved login cookie (giống Bài 60: read-cookie, có null check)
app.get("/auth/cookie", cors(), (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  let username = req.cookies?.username || "";
  let password = req.cookies?.password || "";
  const account = req.cookies?.account;
  if (account != null) {
    username = username || account.username || "";
    password = password || account.password || "";
  }
  res.json({ username, password });
});

// Clear login cookie (giống Bài 60: clear-cookie)
app.get("/auth/clear-cookie", cors(), (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");
  res.clearCookie("account");
  res.json({ message: "Login cookie removed" });
});

app.get("/fashions", cors(), async (req, res) => {
  const result = await fashionCollection.find({}).toArray();
  res.send(result);
});


// CREATE COOKIE
app.get("/create-cookie", cors(), (req,res)=>{

  res.cookie("username","tranduythanh")
  res.cookie("password","123456")

  const account = {
    username:"tranduythanh",
    password:"123456"
  }

  res.cookie("account",account)

  // cookie có thời gian
  res.cookie("infor_limit1","I am limited Cookie - way 1",{
    expire:360000 + Date.now()
  })

  res.cookie("infor_limit2","I am limited Cookie - way 2",{
    maxAge:360000
  })

  res.send("cookies are created")
})


// READ COOKIE
app.get("/read-cookie",cors(),(req,res)=>{
//cookie is stored in client, so we use req

username=req.cookies.username
password=req.cookies.password
account=req.cookies.account

infor="username = "+username+"<br/>"
infor+="password = "+password+"<br/>"

if(account!=null)
{
infor+="account.username = "+account.username+"<br/>"
infor+="account.password = "+account.password+"<br/>"
}

res.send(infor)
})


// CLEAR COOKIE
app.get("/clear-cookie", cors(), (req,res)=>{
  res.clearCookie("account")
  res.send("[account] Cookie is removed")
})

// =============================================================================
// Exercise 62 & 63: Session - Shopping Cart (cart lưu trong Session, mất khi tắt server)
// =============================================================================

// GET products from MongoDB Product collection
app.get("/api/products", cors(), async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    const list = await productCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    console.error("GET /api/products err:", err.message);
    res.json([]);
  }
});

// Add product to session cart
app.post("/api/cart/add", cors(), (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  const item = req.body;
  if (!item || !item._id) return res.status(400).json({ message: "Invalid product" });
  const existing = req.session.cart.find(p => p._id === item._id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else req.session.cart.push({ ...item, qty: 1 });
  res.json({ cart: req.session.cart });
});

// Get cart from session (no-cache: cart changes often)
app.get("/api/cart", cors(), (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.json({ cart: req.session?.cart || [] });
});

// Update cart (remove checked, update qty)
app.put("/api/cart", cors(), (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ message: "Invalid items" });
  req.session.cart = items
    .filter(i => !i.remove && (i.qty || 0) > 0)
    .map(i => {
      const { remove, ...rest } = i;
      return rest;
    });
  res.json({ cart: req.session.cart });
});

// Checkout: save order to DB, clear session cart
app.post("/api/cart/checkout", cors(), async (req, res) => {
  const cart = req.session?.cart || [];
  if (cart.length === 0) return res.status(400).json({ message: "Cart is empty" });
  try {
    const orderCollection = database.collection("Orders");
    await orderCollection.insertOne({
      items: cart,
      total: cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0),
      createdAt: new Date()
    });
    req.session.cart = [];
    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error("Checkout err:", err.message);
    res.status(500).json({ message: "Checkout failed" });
  }
});