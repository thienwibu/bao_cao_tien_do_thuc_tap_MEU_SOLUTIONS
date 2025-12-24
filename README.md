# Báo Cáo Tiến Độ Công Việc - Nguyễn Thế Minh Thiện

Trang web báo cáo tiến độ công việc hàng ngày với bảo mật mật khẩu và lưu trữ dữ liệu vĩnh viễn.

## Tính năng

✅ **Bảo mật mật khẩu** - Chỉ người có mật khẩu mới thêm/xóa được báo cáo
✅ **Lưu trữ vĩnh viễn** - Dữ liệu lưu trên Vercel KV (Redis database)
✅ **Xem công khai** - Mọi người có link đều xem được báo cáo
✅ **Giao diện đẹp** - Responsive, progress bar, màu sắc gradient
✅ **Dễ sử dụng** - Form nhập liệu trực quan

## Cách sử dụng

### Thêm báo cáo mới
1. Click nút "➕ Thêm Báo Cáo Mới"
2. Điền thông tin: Task, %, Khó khăn, Kế hoạch
3. Click "Lưu Báo Cáo"
4. Nhập mật khẩu khi được yêu cầu
5. Báo cáo sẽ hiện ngay

### Xóa báo cáo
1. Click nút "🗑️ Xóa" trên báo cáo
2. Xác nhận xóa
3. Nhập mật khẩu

### Xem báo cáo
- Mọi người có link đều xem được
- Không cần mật khẩu để xem

## Deploy lên Vercel

### Bước 1: Push lên GitHub
```bash
git add .
git commit -m "Update"
git push
```

### Bước 2: Deploy trên Vercel
1. Vào https://vercel.com
2. Import repository từ GitHub
3. **QUAN TRỌNG**: Tạo Vercel KV database:
   - Vào tab "Storage" trong project
   - Click "Create Database"
   - Chọn "KV" (Redis)
   - Tạo database (miễn phí)
   - Vercel sẽ tự động kết nối với project
4. Deploy

### Bước 3: Chia sẻ link
Link sẽ có dạng: `https://bao-cao-tien-do.vercel.app`

## Thay đổi mật khẩu

Mở file `api/reports.js`, tìm dòng:
```javascript
const PASSWORD = 'The@king@999';
```
Thay đổi mật khẩu, sau đó push lại lên GitHub.

## Công nghệ sử dụng

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel KV (Redis)
- **Hosting**: Vercel
