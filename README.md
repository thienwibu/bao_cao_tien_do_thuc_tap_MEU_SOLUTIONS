# Báo Cáo Tiến Độ Công Việc Hàng Ngày

Trang web đơn giản để theo dõi và báo cáo tiến độ công việc hàng ngày.

## Cách sử dụng

### 1. Cập nhật báo cáo hàng ngày
- Mở file `index.html`
- Copy đoạn code của một report-card (từ `<div class="report-card">` đến `</div>`)
- Paste vào đầu, ngay sau phần header
- Chỉnh sửa:
  - Ngày tháng
  - Task đang làm
  - % hoàn thành (thay đổi `style="width: 80%"` và text bên trong)
  - Khó khăn gặp phải
  - Hướng xử lý tiếp theo

### 2. Deploy lên Vercel

#### Bước 1: Cài đặt Vercel CLI (nếu chưa có)
```bash
npm install -g vercel
```

#### Bước 2: Deploy
```bash
vercel
```

Hoặc deploy trực tiếp từ GitHub:
1. Push code lên GitHub repository
2. Vào https://vercel.com
3. Import repository
4. Deploy tự động

### 3. Chia sẻ link
Sau khi deploy, bạn sẽ nhận được link dạng: `https://your-project.vercel.app`
Chia sẻ link này với team để mọi người theo dõi.

## Tùy chỉnh

### Thay đổi màu sắc
Tìm và thay đổi các giá trị màu trong phần `<style>`:
- `#667eea` và `#764ba2` - màu chủ đạo
- `#f8f9fa` - màu nền section

### Thay đổi tên
Sửa dòng: `<p>Cập nhật hàng ngày - [Tên của bạn]</p>`

### Status badge
- `status-ok` - màu xanh (đang tiến hành)
- `status-issue` - màu đỏ (có vấn đề)

## Tips
- Giữ báo cáo ngắn gọn, súc tích
- Cập nhật đều đặn mỗi ngày
- Highlight những vấn đề cần hỗ trợ
- Có thể thêm ảnh screenshot nếu cần
