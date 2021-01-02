import express from 'express';
import { sendEmail } from '../controllers/sendEmail.js';
import { validateEmailBody } from '../middleware/validateEmailInput.js';

const router = express.Router();

router.post('/', validateEmailBody, sendEmail);

export default router;
