const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
    res.send("Welcome to <font color='red'>Tấn Minh</font> API ");
});

// About
app.get("/about", (req, res) => {
    let tbl = "<table border='5' cellpadding='5'>";

    tbl += "<tr>";
    tbl += "<td>STUDENT ID</td><td>SV007</td>";
    tbl += "</tr>";

    tbl += "<tr>";
    tbl += "<td>FULL NAME</td><td>Tấn Minh</td>";
    tbl += "</tr>";

    tbl += "<tr>";
    tbl += "<td colspan='2' align='center'>";
    tbl += "<img src='/images/avatar.jpg' width='500' height='250'/>";
    tbl += "</td>";
    tbl += "</tr>";

    tbl += "</table>";

    res.send(tbl);
});

// Books API (Exercise 38)
const database = [
    { BookId: "b1", BookName: "Kỹ thuật lập trình cơ bản", Price: 70, Image: "b1.png" },
    { BookId: "b2", BookName: "Kỹ thuật lập trình nâng cao", Price: 100, Image: "b2.png" },
    { BookId: "b3", BookName: "Máy học cơ bản", Price: 200, Image: "b3.png" },
    { BookId: "b4", BookName: "Máy học nâng cao", Price: 300, Image: "b4.png" },
    { BookId: "b5", BookName: "Lập trình Robot cơ bản", Price: 250, Image: "b5.png" }
];

app.get("/books", cors(), (req, res) => {
    res.send(database);
});
app.get("/books/:id", cors(), (req, res) => {
    const id = req.params["id"];
    const p = database.find((x) => x.BookId == id);
    if (!p) return res.status(404).send({ message: "Book not found" });
    res.send(p);
});
app.post("/books", cors(), (req, res) => {
    if (!req.body || !req.body.BookId) return res.status(400).send({ message: "BookId is required" });
    database.push(req.body);
    res.send(database);
});
app.put("/books/:id", cors(), (req, res) => {
    const id = req.params["id"];
    const idx = database.findIndex((x) => x.BookId == id);
    if (idx < 0) return res.status(404).send({ message: "Book not found" });
    database[idx] = { ...database[idx], ...req.body, BookId: id };
    res.send(database);
});
app.delete("/books/:id", cors(), (req, res) => {
    const id = req.params["id"];
    const idx = database.findIndex((x) => x.BookId == id);
    if (idx < 0) return res.status(404).send({ message: "Book not found" });
    database.splice(idx, 1);
    res.send(database);
});
app.put("/books/rename/:oldId", cors(), (req, res) => {
    const oldId = req.params["oldId"];
    const idx = database.findIndex((x) => x.BookId == oldId);
    if (idx < 0) return res.status(404).send({ message: "Book not found" });
    if (!req.body || !req.body.BookId) return res.status(400).send({ message: "BookId is required" });
    database[idx] = { ...database[idx], ...req.body, BookId: req.body.BookId };
    res.send(database);
});

app.listen(port, () => {
    console.log(`Tấn Minh Server running at ${port}`);
});
