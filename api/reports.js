// Vercel Serverless Function để lưu/lấy báo cáo
// Sử dụng file system để lưu trữ đơn giản

const PASSWORD = 'The@king@999';

// Lưu trữ tạm trong memory (sẽ reset khi redeploy, nhưng đơn giản nhất)
let reportsData = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Lấy tất cả báo cáo (không cần mật khẩu)
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, reports: reportsData });
    }

    // POST - Thêm báo cáo mới (cần mật khẩu)
    if (req.method === 'POST') {
      const { password, report } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      reportsData.unshift(report);
      return res.status(200).json({ success: true, reports: reportsData });
    }

    // DELETE - Xóa báo cáo (cần mật khẩu)
    if (req.method === 'DELETE') {
      const { password, id } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      reportsData = reportsData.filter(r => r.id !== id);
      return res.status(200).json({ success: true, reports: reportsData });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}
