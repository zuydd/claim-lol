![LOL banner](https://raw.githubusercontent.com/zuydd/image/main/lol.jpg)

# Tool Auto Claim LOL Token NodeJS by ZuyDD

**Tool phát triển và chia sẻ miễn phí bởi ZuyDD**

<a href="https://www.facebook.com/zuy.dd"><img src="https://raw.githubusercontent.com/zuydd/image/main/facebook.svg" alt="Facebook"></a>
<a href="https://t.me/zuydd"><img src="https://raw.githubusercontent.com/zuydd/image/main/telegram.svg" alt="Telegram"></a>

> [!WARNING]
> Mọi hành vi buôn bán tool dưới bất cứ hình thức nào đều không được cho phép!

## 🛠️ Hướng dẫn cài đặt

> Yêu cầu đã cài đặt NodeJS

- Bước 1: Tải về phiên bản mới nhất của tool [tại đây ⬇️](https://github.com/zuydd/claim-lol/archive/refs/heads/main.zip)
- Bước 2: Giải nén tool
- Bước 3: Tại thư mục tool vừa giải nén (thư mục có chứa file package.json), chạy lệnh `npm install` để cài đặt các thư viện bổ trợ

## 💾 Dữ liệu cần chỉnh sửa để chạy tool

- Tổng số lần chạy: tìm biến `COUNT = 200` đổi thành số thích hợp
- Số BNB chuyển qua để claim + chuyển token về ví vệ tinh: tìm biến `AMOUNT_SEND = "0.000001"` đổi thành số phù hợp, thường giao động từ 0.0000001 đến 0.00000011 tuỳ thời giá
- Private key của ví vệ tinh (ví chứa BNB mạng Matchain để chia gas cho các ví): tìm biến `PRIVATE_KEY = "XXX"` đổi XXX thành private key của bạn
- Địa chỉ (mạng Matchain) của ví vệ tinh hoặc bất kỳ ví nào bạn muốn gom token về: tìm biến `PARENT_WALLET_ADDRESS = "YYY"` đổi YYY thành địa chỉ ví của bạn

## >\_ Các lệnh và chức năng tương ứng

| Lệnh            | Chức năng                                                                                |
| --------------- | ---------------------------------------------------------------------------------------- |
| `npm run start` | Dùng để chạy tạo ví, chia gas, claim, gom token, nói chung là tất cả công việc trong một |

## 🕹️ Các tính năng có trong tool

- tự động tạo ví
- tự động chia gas vào ví vừa tạo
- tự động claim token LOL
- tự động chuyển token về ví vệ tinh chỉ định
- bỏ qua khi lỗi

> [!WARNING]
>
> - Nếu lâu lâu gặp lỗi thì kệ nó, đông người claim mạng nó nghẽn thôi
> - BNB dùng để chia gas (phí mạng lưới) phải thuộc mạng Matchin không phải mạng BSC.
> - Địa chỉ ví gom token phải là địa chỉ ví của mạng Matchin
> - Ước tính 1$ giá trị BNB sẽ claim được tầm 100.000.000 token LOL, chơi bao nhiêu là quyền của bạn.
> - Hãy coi việc claim LOL như mua tờ vé số, vốn hoá mà được 10M$ thì về bờ, 100M$ thì x10,... cứ thế tính lên. Chơi tầm chục đô cho vui thôi, đừng ham đấm nhiều nhé 😉

## ♾ Cài đặt đa luồng

- Tool không chạy đa luồng do cơ chế claim token chạy đa luồng ăn lỗi mạng ngập mồm nhé, chạy 1$ mất gần 12h nhé
- Muốn chạy nhanh thì sao chép tool ra nhiều bản, nhưng nhớ phải đổi cả ví vệ tinh (ví chia gas) nhé, chạy 2 tool mà chung một ví nó cũng lỗi ngập mồm nhé. Chạy 5 bản thì chia tiền vô 5 ví để chạy

## 🔄 Lịch sử cập nhật

> Phiên bản mới nhất: `v0.0.1`

<details>
<summary>v0.0.1 - 📅 10/10/2024</summary>
  
- Chia sẽ tool đến cộng đồng
</details>

## 🎁 Donate

Chúng tôi rất vui được chia sẻ các mã script và tài nguyên mã nguồn miễn phí đến cộng đồng làm airdrop. Nếu bạn thấy các công cụ và tài liệu của chúng tôi hữu ích và muốn ủng hộ chúng tôi tiếp tục phát triển và duy trì các dự án này, bạn có thể đóng góp hỗ trợ qua hình thức donate.

Mỗi đóng góp của bạn sẽ giúp chúng tôi duy trì chất lượng dịch vụ và tiếp tục cung cấp những tài nguyên giá trị cho cộng đồng làm airdrop. Chúng tôi chân thành cảm ơn sự hỗ trợ và ủng hộ của bạn!

Mãi iu 😘😘😘

<div style="display: flex; gap: 20px;">
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-momo.png" alt="QR Momo" height="340" />
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-binance.jpg" alt="QR Binance" height="340" />
</div>
