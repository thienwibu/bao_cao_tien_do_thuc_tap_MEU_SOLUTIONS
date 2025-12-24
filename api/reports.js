// Vercel Serverless Function với JSONBin.io làm database
const PASSWORD = 'The@king@999';

// JSONBin.io config - Free tier, không cần đăng ký
const JSONBIN_BIN_ID = '676b3f4aad19ca34f8d6c8e1'; // Public bin ID
const JSONBIN_API = 'https://api.jsonbin.io/v3';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Lấy tất cả báo cáo
    if (req.method === 'GET') {
      const response = await fetch(`${JSONBIN_API}/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': '$2a$10$8vZ8qY9xK.xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ success: true, reports: data.record.reports || [] });
      }
      
      return res.status(200).json({ success: true, reports: [] });
    }

    // POST - Thêm báo cáo mới
    if (req.method === 'POST') {
      const { password, report } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      // Lấy dữ liệu hiện tại
      const getResponse = await fetch(`${JSONBIN_API}/b/${JSONBIN_BIN_ID}/latest`);
      let reports = [];
      
      if (getResponse.ok) {
        const data = await getResponse.json();
        reports = data.record.reports || [];
      }

      // Thêm báo cáo mới
      reports.unshift(report);

      // Lưu lại
      const putResponse = await fetch(`${JSONBIN_API}/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': '$2a$10$8vZ8qY9xK.xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK'
        },
        body: JSON.stringify({ reports })
      });

      if (putResponse.ok) {
        return res.status(200).json({ success: true, reports });
      }

      throw new Error('Failed to save');
    }

    // DELETE - Xóa báo cáo
    if (req.method === 'DELETE') {
      const { password, id } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      // Lấy dữ liệu hiện tại
      const getResponse = await fetch(`${JSONBIN_API}/b/${JSONBIN_BIN_ID}/latest`);
      let reports = [];
      
      if (getResponse.ok) {
        const data = await getResponse.json();
        reports = data.record.reports || [];
      }

      // Xóa báo cáo
      reports = reports.filter(r => r.id !== id);

      // Lưu lại
      const putResponse = await fetch(`${JSONBIN_API}/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': '$2a$10$8vZ8qY9xK.xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK9xK'
        },
        body: JSON.stringify({ reports })
      });

      if (putResponse.ok) {
        return res.status(200).json({ success: true, reports });
      }

      throw new Error('Failed to delete');
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}
