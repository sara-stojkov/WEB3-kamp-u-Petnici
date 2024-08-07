import express from 'express';
import { handlePdfUpload } from '../controllers/pdfController';

const router = express.Router();

router.post('/upload', handlePdfUpload);

export default router;
