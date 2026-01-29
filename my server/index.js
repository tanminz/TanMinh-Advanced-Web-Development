const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
    res.send("xin chào");
});

// About
app.get("/about", (req, res) => {
    let tbl = "<table border='5' cellpadding='5'>";

    tbl += "<tr>";
    tbl += "<td>STUDENT ID</td><td>SV007</td>";
    tbl += "</tr>";

    tbl += "<tr>";
    tbl += "<td>FULL NAME</td><td>Duong Tan Minh</td>";
    tbl += "</tr>";

    tbl += "<tr>";
    tbl += "<td colspan='2' align='center'>";
    tbl += "<img src='/image/me.jpg' width='200'/>";
    tbl += "</td>";
    tbl += "</tr>";

    tbl += "</table>";

    res.send(tbl);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
