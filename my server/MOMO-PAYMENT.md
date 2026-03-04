# Tích hợp MoMo Payment

- **Tham khảo 1:** https://github.com/momo-wallet/
- **Tham khảo 2:** https://developers.momo.vn/v3/docs/payment/guides/home
- **API Initiate:** https://developers.momo.vn/v3/docs/payment/api/payment-api/init/

## Cấu hình (biến môi trường)

| Biến | Mô tả |
|------|--------|
| `MOMO_PARTNER_CODE` | Mã đối tác (từ M4B) |
| `MOMO_ACCESS_KEY` | Access Key |
| `MOMO_SECRET_KEY` | Secret Key (dùng ký HMAC_SHA256) |
| `MOMO_PARTNER_NAME` | Tên đối tác (mặc định: Tấn Minh) |
| `MOMO_STORE_ID` | Store ID (mặc định: MoMoStore) |
| `MOMO_ENDPOINT` | Sandbox: `https://test-payment.momo.vn/v2/gateway/api/create` |
| `MOMO_REDIRECT_URL` | URL redirect sau thanh toán (vd: `http://localhost:4200/payment-result`) |
| `MOMO_IPN_URL` | URL nhận IPN (vd: `http://localhost:3000/payment/momo/ipn`) |

## Quy tắc

- Số tiền: **10.000 – 50.000.000 VND**.
- Chữ ký: HMAC_SHA256, tham số xếp theo thứ tự a-z (theo tài liệu MoMo).
- Timeout gọi MoMo: tối thiểu 30s.

## Chạy không cấu hình key

Nếu không set `MOMO_PARTNER_CODE` / `MOMO_ACCESS_KEY` / `MOMO_SECRET_KEY`, server trả về **payUrl mock** (redirect thẳng sang trang kết quả) để test giao diện.
