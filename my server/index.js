const express = require("express");
const app = express();
app.disable("etag");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
const port = 3000;
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");
const https = require("https");
const { MongoClient } = require("mongodb");

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const paymentDbName = "FashionData";
const paymentCollectionName = "Payments";
const mongoClient = new MongoClient(mongoUrl);
// Tham chiếu collection ngay (thao tác find/insert sẽ chờ khi connect xong)
const paymentsCollection = mongoClient.db(paymentDbName).collection(paymentCollectionName);
mongoClient.connect().then(() => {
    console.log("MongoDB FashionData.Payments connected");
}).catch((err) => console.log("MongoDB connect skip:", err.message));

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Trang kết quả thanh toán: redirect về Angular (tránh Cannot GET /payment-result khi user vào 3000)
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";
app.get("/payment-result", cors(), (req, res) => {
    // Postman: thêm ?test=1 để nhận JSON thay vì redirect
    if (req.query.test === "1") {
        return res.json({ ok: true, message: "GET /payment-result OK", redirectTo: `${FRONTEND_URL}/payment-result` });
    }
    const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    res.redirect(302, `${FRONTEND_URL}/payment-result${qs}`);
});

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

// Books API (Exercise 38 + 50)
const database = [
    {
        BookId: "b1",
        BookName: "Kỹ thuật lập trình cơ bản",
        Price: 70,
        Image: "b1.png",
        Description: "Giáo trình nhập môn lập trình, giúp người học nắm vững tư duy thuật toán và cú pháp cơ bản.",
        UpdateDate: "25/10/2014",
        Quantity: 120,
        MaCD: 7,
        MaNXB: 1
    },
    {
        BookId: "b2",
        BookName: "Kỹ thuật lập trình nâng cao",
        Price: 100,
        Image: "b2.png",
        Description: "Nội dung nâng cao về OOP, xử lý file, cấu trúc dữ liệu và tối ưu chương trình.",
        UpdateDate: "23/10/2013",
        Quantity: 25,
        MaCD: 3,
        MaNXB: 2
    },
    {
        BookId: "b3",
        BookName: "Máy học cơ bản",
        Price: 200,
        Image: "b3.png",
        Description: "Giới thiệu Machine Learning cơ bản: hồi quy, phân loại và đánh giá mô hình.",
        UpdateDate: "15/09/2014",
        Quantity: 240,
        MaCD: 8,
        MaNXB: 4
    },
    {
        BookId: "b4",
        BookName: "Máy học nâng cao",
        Price: 300,
        Image: "b4.png",
        Description: "Các kỹ thuật ML nâng cao: ensemble, SVM, tuning và triển khai mô hình.",
        UpdateDate: "12/02/2026",
        Quantity: 50,
        MaCD: 5,
        MaNXB: 1
    },
    {
        BookId: "b5",
        BookName: "Lập trình Robot cơ bản",
        Price: 250,
        Image: "b5.png",
        Description: "Lập trình robot cơ bản, điều khiển chuyển động và xử lý tín hiệu.",
        UpdateDate: "12/02/2026",
        Quantity: 50,
        MaCD: 5,
        MaNXB: 1
    }
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

// =============================================================================
// MoMo Payment - Tích hợp thanh toán MoMo
// Tham khảo 1: https://github.com/momo-wallet/
// Tham khảo 2: https://developers.momo.vn/v3/docs/payment/guides/home
// API Initiate: https://developers.momo.vn/v3/docs/payment/api/payment-api/init/
// =============================================================================
const MOMO_PARTNER_CODE = process.env.MOMO_PARTNER_CODE || "";
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY || "";
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY || "";
const MOMO_PARTNER_NAME = process.env.MOMO_PARTNER_NAME || "Tấn Minh";
const MOMO_STORE_ID = process.env.MOMO_STORE_ID || "MoMoStore";
const MOMO_ENDPOINT = process.env.MOMO_ENDPOINT || "https://test-payment.momo.vn/v2/gateway/api/create";
const MOMO_REDIRECT_URL = process.env.MOMO_REDIRECT_URL || "http://localhost:4200/payment-result";
const MOMO_IPN_URL = process.env.MOMO_IPN_URL || "http://localhost:3000/payment/momo/ipn";

const MOMO_AMOUNT_MIN = 10000;
const MOMO_AMOUNT_MAX = 50000000;

function buildMomosignature(accessKey, amount, extraData, ipnUrl, orderId, orderInfo, partnerClientId, partnerCode, redirectUrl, requestId, requestType, secretKey) {
    const raw =
        `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerClientId=${partnerClientId}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    return crypto.createHmac("sha256", secretKey).update(raw).digest("hex");
}

app.post("/payment/momo", cors(), (req, res) => {
    const amountNum = Number(req.body?.amount) || 0;
    const amount = String(Math.round(amountNum));
    const orderId = `MOMO${Date.now()}`;
    const requestId = orderId;
    const orderInfo = req.body?.orderInfo || "Thanh toán MoMo - Tấn Minh";
    const requestType = "captureWallet";
    const extraData = "";
    const partnerClientId = req.body?.partnerClientId || "";

    if (amountNum < MOMO_AMOUNT_MIN || amountNum > MOMO_AMOUNT_MAX) {
        return res.status(400).json({
            message: `Số tiền phải từ ${MOMO_AMOUNT_MIN.toLocaleString("vi-VN")} đến ${MOMO_AMOUNT_MAX.toLocaleString("vi-VN")} VND`
        });
    }

    const paymentRecord = { orderId, amount, status: "pending", createdAt: new Date() };
    paymentsCollection.insertOne(paymentRecord).catch((e) => console.error("Payment save err:", e.message));

    if (!MOMO_PARTNER_CODE || !MOMO_ACCESS_KEY || !MOMO_SECRET_KEY) {
        const base = req.body?.redirectBase || MOMO_REDIRECT_URL.replace(/\/payment-result.*$/, '') || 'http://localhost:4200';
        const redirectUrl = (base.startsWith('http') ? base : `http://${base}`).replace(/\/$/, '') + '/payment-result';
        const fallbackPayUrl = `${redirectUrl}?resultCode=0&message=Mock%20success&orderId=${orderId}&amount=${amount}`;
        return res.send({ payUrl: fallbackPayUrl, mock: true });
    }

    const signature = buildMomosignature(
        MOMO_ACCESS_KEY, amount, extraData, MOMO_IPN_URL, orderId, orderInfo,
        partnerClientId, MOMO_PARTNER_CODE, MOMO_REDIRECT_URL, requestId, requestType, MOMO_SECRET_KEY
    );

    const requestBody = JSON.stringify({
        partnerCode: MOMO_PARTNER_CODE,
        partnerName: MOMO_PARTNER_NAME,
        storeId: MOMO_STORE_ID,
        accessKey: MOMO_ACCESS_KEY,
        requestId,
        amount: Number(amount),
        orderId,
        orderInfo,
        redirectUrl: MOMO_REDIRECT_URL,
        ipnUrl: MOMO_IPN_URL,
        extraData,
        requestType,
        signature,
        lang: "vi",
        ...(partnerClientId && { partnerClientId })
    });

    const url = new URL(MOMO_ENDPOINT);
    const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname,
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Content-Length": Buffer.byteLength(requestBody)
        },
        timeout: 30000
    };

    const momoReq = https.request(options, (momoRes) => {
        let data = "";
        momoRes.on("data", (chunk) => (data += chunk));
        momoRes.on("end", () => {
            try {
                const parsed = JSON.parse(data);
                return res.send(parsed);
            } catch (err) {
                return res.status(500).send({ message: "Invalid response from MoMo", raw: data });
            }
        });
    });

    momoReq.on("error", (err) => {
        res.status(500).send({ message: "MoMo request error", error: err?.message });
    });

    momoReq.setTimeout(30000);
    momoReq.write(requestBody);
    momoReq.end();
});

app.get("/payments", cors(), async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const list = await paymentsCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.json(list);
    } catch (err) {
        console.error("GET /payments err:", err.message);
        res.json([]);
    }
});

app.get("/payment/result", cors(), async (req, res) => {
    const orderId = req.query?.orderId;
    const resultCode = req.query?.resultCode;
    if (orderId) {
        const status = resultCode === "0" ? "paid" : "failed";
        try {
            await paymentsCollection.updateOne({ orderId }, { $set: { status, updatedAt: new Date() } });
        } catch (e) {
            console.error("Payment result update err:", e.message);
        }
    }
    res.json({ ok: true });
});

app.post("/payment/momo/ipn", cors(), async (req, res) => {
    console.log("MoMo IPN:", JSON.stringify(req.body));
    const orderId = req.body?.orderId;
    const resultCode = req.body?.resultCode;
    if (orderId != null) {
        const status = resultCode === 0 ? "paid" : "failed";
        try {
            await paymentsCollection.updateOne({ orderId }, { $set: { status, updatedAt: new Date() } });
        } catch (e) {
            console.error("IPN update err:", e.message);
        }
    }
    res.status(200).send({ message: "IPN received" });
});

app.listen(port, () => {
    console.log(`Tấn Minh Server running at ${port}`);
});
