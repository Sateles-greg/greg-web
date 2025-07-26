import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config();

export async function uploadRelatorioDrive(filePath: string) {
  const fs = require('fs');
  if (!process.env.GOOGLE_KEY_FILE) {
    console.error('GOOGLE_KEY_FILE não definido nas variáveis de ambiente.');
    fs.copyFileSync(filePath, 'public/logs/relatorio-simbiotico.txt');
    return { fallback: true, error: 'GOOGLE_KEY_FILE não definido' };
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });
  const drive = google.drive({ version: 'v3', auth });
  try {
    const res = await drive.files.create({
      requestBody: {
        name: 'relatorio-simbiotico.txt',
        mimeType: 'text/plain'
      },
      media: {
        mimeType: 'text/plain',
        body: fs.createReadStream(filePath)
      }
    });
    return res.data;
  } catch (e) {
    console.error('Erro ao enviar para o Drive:', e);
    fs.copyFileSync(filePath, 'public/logs/relatorio-simbiotico.txt');
    return { fallback: true, error: e };
  }
}
