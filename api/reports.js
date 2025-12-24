// Vercel Serverless Function để lưu/lấy báo cáo
import { put, head } from '@vercel/blob';

const PASSWORD = 'The@king@999';
const BLOB_FILENAME = 'reports.json';

// Hàm đọc dữ liệu từ Blob
async function getReports() {
  try {
    const blobUrl = `https://${process.env.BLOB_READ_WRITE_TOKEN?.split('_')[0]}.public.blob.vercel-storage.com/${BLOB_FILENAME}`;
    const response = await fetch(blobUrl);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.log('No existing data, starting fresh');
    return [];
  }
}

// Hàm lưu dữ liệu vào Blob
async function saveReports(reports) {
  const blob = await put(BLOB_FILENAME, JSON.stringify(reports), {
    access: 'public',
    contentType: 'application/json',
  });
  return blob;
}

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
      const reports = await getReports();
      return res.status(200).json({ success: true, reports });
    }

    // POST - Thêm báo cáo mới (cần mật khẩu)
    if (req.method === 'POST') {
      const { password, report } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      const reports = await getReports();
      reports.unshift(report);
      await saveReports(reports);
      
      return res.status(200).json({ success: true, reports });
    }

    // DELETE - Xóa báo cáo (cần mật khẩu)
    if (req.method === 'DELETE') {
      const { password, id } = req.body;

      if (password !== PASSWORD) {
        return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
      }

      const reports = await getReports();
      const filteredReports = reports.filter(r => r.id !== id);
      await saveReports(filteredReports);
      
      return res.status(200).json({ success: true, reports: filteredReports });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}
