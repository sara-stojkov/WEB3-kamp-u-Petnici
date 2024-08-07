import { create } from 'ipfs-http-client';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function splitPdf(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(fileBuffer);

  const pageCount = pdfDoc.getPageCount();
  const pageBuffers = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();
    pageBuffers.push(pdfBytes);
  }
  wha
  return pageBuffers;
}

async function addPdfPagesToIpfs(filePath) {
  const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
  const pageBuffers = await splitPdf(filePath);

  const cids = [];
  for (const [index, pageBuffer] of pageBuffers.entries()) {
    const added = await ipfs.add({ path: `${filePath}-page-${index + 1}.pdf`, content: pageBuffer });
    console.log(`Page ${index + 1} added to IPFS with CID:`, added.cid.toString());
    cids.push(added.cid.toString());
  }

  return cids;
}

const filePath = 'Water_Quality_Parameters.pdf';
addPdfPagesToIpfs(filePath)
  .then((cids) => {
    console.log('PDF pages successfully added to IPFS:', cids);
  })
  .catch((error) => {
    console.error('Error adding PDF pages to IPFS:', error);
  });
