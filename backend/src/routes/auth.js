import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import { signJwt } from '../utils/authMiddleware.js';

const router = express.Router();

// Rate limit for OTP endpoints
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

// Simple dev transporter; replace with real SMTP in production
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password'
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(to, otp) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@re_grocery.local',
    to,
    subject: 'Your ReGroceery OTP',
    text: `OTP: ${otp} expires 5min.`
  });
  return info?.messageId || 'sent';
}

// POST /api/auth/register
router.post('/register', otpLimiter, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // store temp user-like record in a shadow table alternative: store in same User with passwordHash and pendingOtp
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        pendingOtp: otp,
        otpExpiry: expiry
      }
    });

    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP sent' });
  } catch (e) {
    return next(e);
  }
});

// POST /api/auth/otp/verify-register
router.post('/otp/verify-register', async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.pendingOtp || !user.otpExpiry) return res.status(400).json({ error: 'No OTP pending' });
    if (user.pendingOtp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (new Date(user.otpExpiry) < new Date()) return res.status(400).json({ error: 'OTP expired' });

    // credit wallet and clear pending OTP
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        walletBalance: { increment: 100.0 },
        transactions: {
          // store as JSON array
          set: Array.isArray(user.transactions)
            ? [...user.transactions, { type: 'promo', amount: '100.00', date: new Date().toISOString() }]
            : [{ type: 'promo', amount: '100.00', date: new Date().toISOString() }]
        },
        pendingOtp: null,
        otpExpiry: null
      }
    });

    const token = signJwt({ id: updated.id, email: updated.email });
    return res.json({ token, user: { email: updated.email, walletBalance: updated.walletBalance } });
  } catch (e) {
    return next(e);
  }
});

// POST /api/auth/login
router.post('/login', otpLimiter, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    await prisma.user.update({ where: { id: user.id }, data: { pendingOtp: otp, otpExpiry: expiry } });
    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP sent' });
  } catch (e) {
    return next(e);
  }
});

// POST /api/auth/otp/verify-login
router.post('/otp/verify-login', async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.pendingOtp || !user.otpExpiry) return res.status(400).json({ error: 'No OTP pending' });
    if (user.pendingOtp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (new Date(user.otpExpiry) < new Date()) return res.status(400).json({ error: 'OTP expired' });

    await prisma.user.update({ where: { id: user.id }, data: { pendingOtp: null, otpExpiry: null } });
    const token = signJwt({ id: user.id, email: user.email });
    return res.json({ token, user: { email: user.email, walletBalance: user.walletBalance } });
  } catch (e) {
    return next(e);
  }
});

// POST /api/auth/logout -> client-side only acknowledgement
router.post('/logout', (req, res) => {
  return res.json({ message: 'Logged out (client-side token discard)' });
});

export default router;


