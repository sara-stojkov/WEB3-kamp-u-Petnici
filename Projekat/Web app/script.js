// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Check if libraries are loaded
    if (!window.IpfsHttpClient || !window.pdfLib) {
        console.error('IPFS or pdf-lib library is not loaded.');
        return;
    }

    const { create } = window.IpfsHttpClient;
    const { PDFDocument } = window.pdfLib;

    document.getElementById('submitBtn').addEventListener('click', async function() {
        const fileInput = document.getElementById('pdfInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file');
            return;
        }

        try {
            const fileBuffer = await file.arrayBuffer();
            const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
            const cids = await addPdfPagesToIpfs(fileBuffer, ipfs);
            console.log('PDF pages successfully added to IPFS:', cids);
        } catch (error) {
            console.error('Error processing file:', error);
        }
    });

    async function addPdfPagesToIpfs(fileBuffer, ipfs) {
        const pageBuffers = await splitPdf(fileBuffer);
        const cids = [];

        for (const [index, pageBuffer] of pageBuffers.entries()) {
            const added = await ipfs.add({ path: `page-${index + 1}.pdf`, content: pageBuffer });
            console.log(`Page ${index + 1} added to IPFS with CID:`, added.cid.toString());
            cids.push(added.cid.toString());
        }

        return cids;
    }

    async function splitPdf(fileBuffer) {
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

        return pageBuffers;
    }
});
