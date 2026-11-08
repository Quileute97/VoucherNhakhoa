# HH Dental — Self-Service Affiliate Voucher Hub 🦷✨
> **Hệ thống tạo Voucher tự động & Mã QR cá nhân hóa cho Cộng Tác Viên (CTV) Nha Khoa**  
> Lấy cảm hứng từ triết lý thiết kế Luxury Dark & Gold của **[1Human.at](https://1human.at/about)**.

---

## 💡 Luồng hoạt động (UX Workflow)

```
[CTV nhập Mã Ref / SĐT]
        │
        ▼
[Hệ thống kiểm tra Partner ID hợp lệ trên Supabase]
        │
        ▼
[Tự động Render Voucher / Vé ưu đãi chuyên nghiệp]
  ├── Tên CTV / Mã đối tác (Ví dụ: P102, REF-N5JY)
  ├── QR Code đặt lịch chứa sẵn parameter ?ref=P102
  ├── Ưu đãi: Khám 0đ + Giảm 500k dịch vụ
        │
        ▼
[CTV nhấn "Tải ảnh Voucher" hoặc "Copy Link Quà Tặng"]
        │
        ▼
[Gửi cho Khách hàng qua Zalo / Messenger / Facebook]
        │
        ▼
[Khách đến Nha khoa chìa Voucher / Quét QR] ──► Lễ tân nhập CRM ──► Tự động gắn CTV nhận 20%
```

---

## 🎨 Các Tính Năng Chính

### 1. Ô tìm kiếm & Xác thực CTV (Search & Auth)
- Nhập Mã CTV (hoặc Số điện thoại) → Hệ thống truy vấn bảng `partners` trên Supabase:
  ```sql
  select id, code, name, phone, status from partners 
  where (code = :input or phone = :input) and status = 'ACTIVE'
  ```
- Hiển thị badge xanh: **"Chào đối tác: [Tên CTV] • Mã: [Code]"**.
- Tự động lưu mã vào `localStorage` (`last_used_ref_code`) để không phải gõ lại lần sau.
- Báo lỗi tiếng Việt nếu không tìm thấy: *"Mã đối tác hoặc Số điện thoại chưa được đăng ký trong hệ thống."*

### 2. Khung xem trước Live Preview VIP Ticket Card
- Thiết kế chuẩn tỷ lệ **Boarding Pass / VIP Ticket** (2:1 / 16:9).
- Rãnh xé vé tròn (*perforated ticket notch*) và đường nét đứt xé vé chân thực.
- 3 Chủ đề màu sắc sang trọng có thể chuyển đổi linh hoạt:
  - **Obsidian Gold** (Cảm hứng 1Human.at: Đen than chì & Vàng kim hoàng gia).
  - **Medical Cyan** (Xanh y tế hiện đại & Ngọc lục bảo).
  - **Sapphire Royal** (Xanh dương quý tộc & Bạch kim).
- Nội dung đầy đủ trên thẻ:
  - Logo & Tên **HH Dental Clinic**.
  - Tiêu đề: **VOUCHER ƯU ĐÃI ĐẶC BIỆT / SPECIAL VIP TICKET**.
  - 2 Quyền lợi: **MIỄN PHÍ Khám & Chụp X-Quang CT Cone Beam** + **TẶNG 500.000đ Dịch vụ Sứ & Niềng Răng**.
  - Người bảo trợ: **Được tài trợ bởi CTV: [Tên CTV] (Mã: [Code])**.
  - QR Code bảo mật mã hóa link đặt lịch.
  - Điều kiện: *"Vui lòng xuất trình voucher này tại quầy lễ tân khi làm thủ tục"*.

### 3. Bộ Nút Hành Động 1-Click Cho CTV
1. **📸 Tải Ảnh Voucher (PNG):** Xuất ảnh độ phân giải cao 4K (`html-to-image`, `pixelRatio: 3`) tên file `Voucher_[Code].png` lưu về máy.
2. **🔗 Copy Link Đặt Lịch:** Sao chép `https://nhakhoa.com/dat-lich?ref=[Code]` vào Clipboard kèm Toast thông báo.
3. **💬 Gửi Qua Zalo:** Soạn sẵn lời chúc tặng voucher + link đặt lịch và mở ứng dụng Zalo.
4. **📲 Chia sẻ Facebook:** Mở hộp thoại share Facebook trực tiếp.
5. **👁️ Trải nghiệm Đặt Lịch:** Chuyển nhanh sang màn hình tiếp nhận khách để kiểm tra luồng khách hàng.

### 4. Trang Đặt Lịch Tiếp Nhận Khách Hàng (`/dat-lich`)
- Đọc tham số `?ref=...` từ URL.
- Hiển thị Banner cá nhân hóa: *"Được tài trợ bởi Đối tác: [Tên CTV]"*.
- Khách điền thông tin (Họ tên, SĐT, Dịch vụ quan tâm, Ngày hẹn, Khung giờ, Ghi chú).
- Tự động chèn khách hàng mới vào bảng `customers` với:
  - `owner_partner_id = partner.id`
  - `status = 'lead'`
  - Sinh mã khách hàng `KH-2026-xxxx` và mã đặt lịch `VIP-2026-xxxx`.
- Trả về **Thẻ Tiếp Nhận Điện Tử** có mã QR để lễ tân quét xác nhận khi khách đến phòng khám.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

```bash
# 1. Cài đặt thư viện phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Dev server)
npm run dev

# 3. Mở trình duyệt tại:
# - Trang Tạo Voucher CTV: http://localhost:5174/tao-voucher
# - Trang Đặt Lịch Tiếp Nhận: http://localhost:5174/dat-lich?ref=P102
```

---

## 🧪 Tài Khoản CTV Dùng Thử Ngay

| Mã CTV | Tên Đối Tác | Số Điện Thoại | Ghi Chú |
|---|---|---|---|
| **P102** | Trần Thị Thu Hà (CTV P102) | `0987654321` | Mã mẫu theo yêu cầu đề bài |
| **REF-N5JY** | Nguyễn Minh Đạt | `0359389615` | Bác sĩ Sáng lập / Đối tác Gốc |

