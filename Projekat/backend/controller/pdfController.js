import path from 'path';
import fs from 'fs';
import { addPdfPagesToIpfs } from '../citavPdf';

const handlePdfUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const cids = await addPdfPagesToIpfs(filePath);
    
    // Optionally, remove the file after processing
    fs.unlinkSync(filePath);

    res.send({ message: 'PDF pages successfully added to IPFS.', cids });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send({ message: 'An error occurred during the upload.' });
  }
};

export { handlePdfUpload };
