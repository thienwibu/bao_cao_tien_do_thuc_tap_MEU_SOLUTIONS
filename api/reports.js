// Vercel Serverless Function để lưu/lấy báo cáo
import { kv } from '@vercel/kv';

const PASSWORD = 'The@king@999';
const STORAGE_KEY = 'work_reports';

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
      const reports = await kv.get(STORAGE_KEY) || [];
      return res.status(200).json({ success: true, reports });
    }

    // POST - Thêm báo cáo mới (cần mật khẩu)
    if (req.method === 'POST') {
      const { password, report } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      const reports = await kv.get(STORAGE_KEY) || [];
      reports.unshift(report);
      await kv.set(STORAGE_KEY, reports);
      
      return res.status(200).json({ success: true, reports });
    }

    // DELETE - Xóa báo cáo (cần mật khẩu)
    if (req.method === 'DELETE') {
      const { password, id } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      const reports = await kv.get(STORAGE_KEY) || [];
      const filteredReports = reports.filter(r => r.id !== id);
      await kv.set(STORAGE_KEY, filteredReports);
      
      return res.status(200).json({ success: true, reports: filteredReports });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
