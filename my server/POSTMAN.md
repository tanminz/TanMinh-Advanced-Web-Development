# Kiểm tra API bằng Postman (tham khảo MomoExercise)

**Backend:** chạy trong thư mục `my server`: `npm start` (port **3000**).  
**Angular:** chạy trong thư mục `my-app`: `ng serve` (port **4200**).  
**Trang MoMo:** mở trình duyệt `http://localhost:4200/momo`, lịch sử: `http://localhost:4200/momo-history`.

---

## 1. Tạo thanh toán MoMo (POST)

- **Method:** `POST`
- **URL:** `http://localhost:3000/payment/momo`
- **Headers:** `Content-Type` = `application/json`
- **Body (raw, JSON):**
```json
{
  "amount": 50000
}
```

**Kết quả:** 200, body có `payUrl` (mock: `http://localhost:4200/payment-result?resultCode=0&...`). Mở `payUrl` trong trình duyệt để xem trang kết quả.

**Lỗi:** 400 nếu amount < 10.000 hoặc > 50.000.000.

---

## 2. Lấy danh sách thanh toán từ MongoDB (GET)

- **Method:** `GET`
- **URL:** `http://localhost:3000/payments`

**Kết quả:** 200, body là mảng JSON (có thể `[]`).

---

## 3. Cập nhật trạng thái khi user quay về (GET)

- **Method:** `GET`
- **URL:** `http://localhost:3000/payment/result?orderId=MOMO1738...&resultCode=0`

**Kết quả:** 200, body `{ "ok": true }`.

---

## 4. Redirect trang kết quả (GET)

- **Method:** `GET`
- **URL:** `http://localhost:3000/payment-result?resultCode=0&orderId=MOMO123&amount=50000`

**Kết quả:** 302 redirect sang `http://localhost:4200/payment-result?...`. Trong Postman bật "Follow redirect" nếu cần.

---

**Tóm tắt:** Backend 3000 (API), Angular 4200 (trang **/momo**, **/momo-history**, **/payment-result**). Giống MomoExercise: route **Momo** và **MomoHistory**, API **/payment** và **/payments**.
