// Express.js server for local development
// Run with: npm run server
// Or: node server.js

import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const SESSION_DURATION = '24h';

// MongoDB connection
let db = null;
let client = null;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'gallena-medical';

// Connect to MongoDB
async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db(DB_NAME);
      console.log('✅ Connected to MongoDB');

      // Create indexes
      await db.collection('appointments').createIndex({ timestamp: -1 });
      await db.collection('contact').createIndex({ timestamp: -1 });
      await db.collection('users').createIndex({ username: 1 }, { unique: true });
    }
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Fallback to file storage if MongoDB is not available
    console.log('📂 Falling back to file storage...');
    return null;
  }
}

// Initialize database connection
const dbPromise = connectDB();

// Email configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Verify email configuration
emailTransporter.verify((error) => {
  if (error) {
    console.warn('⚠️  Email not configured. Set SMTP_USER and SMTP_PASS in .env');
  } else {
    console.log('✅ Email transporter ready');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next(err);
});

// Authentication middleware
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to save submission (with MongoDB fallback to file)
async function saveSubmission(type, data) {
  const submission = {
    _id: new ObjectId(),
    ...data,
    timestamp: new Date(),
  };

  const database = await dbPromise;
  if (database) {
    // Save to MongoDB
    await database.collection(type).insertOne(submission);
    return submission;
  } else {
    // Fallback to file storage
    const submissionsFile = path.join(__dirname, 'submissions.json');
    let submissions = { appointments: [], contact: [] };

    if (fs.existsSync(submissionsFile)) {
      try {
        const fileData = fs.readFileSync(submissionsFile, 'utf8').trim();
        if (fileData) {
          submissions = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error parsing submissions.json, starting fresh:', error);
        submissions = { appointments: [], contact: [] };
      }
    }

    submissions[type].push({
      id: submission._id.toString(),
      ...data,
      timestamp: submission.timestamp.toISOString(),
    });

    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
    return submission;
  }
}

// Helper function to get submissions
async function getSubmissions(type) {
  const database = await dbPromise;
  if (database) {
    return await database.collection(type).find({}).sort({ timestamp: -1 }).toArray();
  } else {
    // Fallback to file storage
    const submissionsFile = path.join(__dirname, 'submissions.json');
    if (!fs.existsSync(submissionsFile)) return [];
    try {
      const fileData = fs.readFileSync(submissionsFile, 'utf8').trim();
      if (!fileData) return [];
      const submissions = JSON.parse(fileData);
      return submissions[type] || [];
    } catch (error) {
      console.error('Error parsing submissions.json:', error);
      return [];
    }
  }
}

// Helper function to delete submission
async function deleteSubmission(type, id) {
  const database = await dbPromise;
  if (database) {
    return await database.collection(type).deleteOne({ _id: new ObjectId(id) });
  } else {
    // Fallback to file storage
    const submissionsFile = path.join(__dirname, 'submissions.json');
    if (!fs.existsSync(submissionsFile)) return { deletedCount: 0 };
    try {
      const fileData = fs.readFileSync(submissionsFile, 'utf8').trim();
      if (!fileData) return { deletedCount: 0 };
      const submissions = JSON.parse(fileData);
      const index = submissions[type].findIndex((s) => s.id === id);
      if (index !== -1) {
        submissions[type].splice(index, 1);
        fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    } catch (error) {
      console.error('Error parsing submissions.json:', error);
      return { deletedCount: 0 };
    }
  }
}

// Send email notification
async function sendEmailNotification(type, data) {
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'bahatibrianp@gmail.com';

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  Email not sent: SMTP not configured');
    return;
  }

  try {
    const subject =
      type === 'appointments'
        ? `New Appointment Request from ${data.fullName}`
        : `New Contact Form Submission from ${data.fullName}`;

    const html = `
      <h2>${type === 'appointments' ? 'New Appointment Request' : 'New Contact Form Submission'}</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.preferredDateTime ? `<p><strong>Preferred Date & Time:</strong> ${new Date(data.preferredDateTime).toLocaleString()}</p>` : ''}
      ${data.department ? `<p><strong>Department:</strong> ${data.department}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    await emailTransporter.sendMail({
      from: `"Gallena Medical Centre" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject,
      html,
    });

    console.log('✅ Email notification sent');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

// Load users from file (fallback when MongoDB is unavailable)
function loadUsersFromFile() {
  const usersFile = path.join(__dirname, 'users.json');
  try {
    if (fs.existsSync(usersFile)) {
      const fileData = fs.readFileSync(usersFile, 'utf8').trim();
      if (fileData) {
        return JSON.parse(fileData);
      }
    }
  } catch (error) {
    console.error('Error loading users.json:', error);
  }
  return null;
}

function saveUsersToFile(users) {
  const usersFile = path.join(__dirname, 'users.json');
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving users.json:', error);
  }
}

// Initialize default admin user (file-based fallback)
async function initializeDefaultAdmin() {
  const database = await dbPromise;
  if (database) {
    // MongoDB available - use database
    const adminExists = await database.collection('users').findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await database.collection('users').insertOne({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
      });
      console.log('🔐 Default admin created: username="admin", password="admin123"');
      console.log('⚠️  CHANGE THE DEFAULT PASSWORD IN PRODUCTION!');
    }
  } else {
    // MongoDB not available - use file storage
    const usersFile = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(usersFile)) {
      try {
        const fileData = fs.readFileSync(usersFile, 'utf8').trim();
        if (fileData) {
          users = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error loading users.json, creating new:', error);
      }
    }

    const adminExists = users.find((u) => u.username === 'admin');
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      users.push({
        id: Date.now().toString(),
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });
      saveUsersToFile(users);
      console.log('🔐 Default admin created (file-based): username="admin", password="admin123"');
      console.log('⚠️  CHANGE THE DEFAULT PASSWORD IN PRODUCTION!');
    }
  }
}

// Admin user will be initialized when server starts

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const database = await dbPromise;
    let user = null;

    if (database) {
      // Use MongoDB
      user = await database.collection('users').findOne({ username });
    } else {
      // Fallback to file storage
      const users = loadUsersFromFile();
      if (users) {
        user = users.find((u) => u.username === username);
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id?.toString() || user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
    );

    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Appointment endpoint
app.post('/api/appointments', async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.preferredDateTime ||
      !data.department
    ) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please complete all required fields.',
      });
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please enter a valid email address.',
      });
    }

    // Save to database/file
    const submission = await saveSubmission('appointments', data);

    // Log the submission
    console.log('📅 New appointment request:', submission);

    // Send email notification
    await sendEmailNotification('appointments', data);

    res.json({
      success: true,
      message: 'Appointment request received successfully. We will contact you shortly.',
    });
  } catch (error) {
    console.error('❌ Error processing appointment:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.fullName || !data.email || !data.message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill out all required fields.',
      });
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please enter a valid email address.',
      });
    }

    // Save to database/file
    const submission = await saveSubmission('contact', data);

    // Log the submission
    console.log('✉️ New contact form submission:', submission);

    // Send email notification
    await sendEmailNotification('contact', data);

    res.json({
      success: true,
      message: 'Message sent successfully. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// View all submissions (Admin endpoint - protected)
app.get('/api/submissions', authenticate, async (req, res) => {
  try {
    const appointments = await getSubmissions('appointments');
    const contact = await getSubmissions('contact');

    res.json({
      appointments: appointments.map((s) => ({
        id: s._id?.toString() || s.id,
        ...s,
        _id: undefined,
      })),
      contact: contact.map((s) => ({
        id: s._id?.toString() || s.id,
        ...s,
        _id: undefined,
      })),
      totals: {
        appointments: appointments.length,
        contact: contact.length,
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// View appointments only (protected)
app.get('/api/submissions/appointments', authenticate, async (req, res) => {
  try {
    const appointments = await getSubmissions('appointments');
    res.json(
      appointments.map((s) => ({
        id: s._id?.toString() || s.id,
        ...s,
        _id: undefined,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// View contact submissions only (protected)
app.get('/api/submissions/contact', authenticate, async (req, res) => {
  try {
    const contact = await getSubmissions('contact');
    res.json(
      contact.map((s) => ({
        id: s._id?.toString() || s.id,
        ...s,
        _id: undefined,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Delete a submission (by ID) - protected
app.delete('/api/submissions/:type/:id', authenticate, async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type !== 'appointments' && type !== 'contact') {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const result = await deleteSubmission(type, id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Export submissions to CSV/Excel - protected
app.get('/api/submissions/export/:format', authenticate, async (req, res) => {
  try {
    const { format } = req.params; // 'csv' or 'xlsx'
    const type = req.query.type || 'all'; // 'appointments', 'contact', or 'all'

    let appointments = [];
    let contact = [];

    if (type === 'all' || type === 'appointments') {
      appointments = await getSubmissions('appointments');
    }
    if (type === 'all' || type === 'contact') {
      contact = await getSubmissions('contact');
    }

    if (format === 'csv') {
      // Generate CSV
      let csv = '';

      if (appointments.length > 0) {
        csv += 'Appointments\n';
        csv += 'ID,Full Name,Email,Phone,Preferred Date & Time,Department,Message,Timestamp\n';
        appointments.forEach((s) => {
          csv += `"${s._id?.toString() || s.id}","${s.fullName}","${s.email}","${s.phone || ''}","${s.preferredDateTime || ''}","${s.department || ''}","${(s.message || '').replace(/"/g, '""')}","${s.timestamp}"\n`;
        });
        csv += '\n';
      }

      if (contact.length > 0) {
        csv += 'Contact Submissions\n';
        csv += 'ID,Full Name,Email,Message,Timestamp\n';
        contact.forEach((s) => {
          csv += `"${s._id?.toString() || s.id}","${s.fullName}","${s.email}","${(s.message || '').replace(/"/g, '""')}","${s.timestamp}"\n`;
        });
      }

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="submissions-${Date.now()}.csv"`);
      res.send(csv);
    } else if (format === 'xlsx') {
      // Generate Excel
      const workbook = XLSX.utils.book_new();

      if (appointments.length > 0) {
        const appointmentsData = appointments.map((s) => ({
          ID: s._id?.toString() || s.id,
          'Full Name': s.fullName,
          Email: s.email,
          Phone: s.phone || '',
          'Preferred Date & Time': s.preferredDateTime
            ? new Date(s.preferredDateTime).toLocaleString()
            : '',
          Department: s.department || '',
          Message: s.message || '',
          Timestamp: new Date(s.timestamp).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(appointmentsData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
      }

      if (contact.length > 0) {
        const contactData = contact.map((s) => ({
          ID: s._id?.toString() || s.id,
          'Full Name': s.fullName,
          Email: s.email,
          Message: s.message || '',
          Timestamp: new Date(s.timestamp).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(contactData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact');
      }

      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', `attachment; filename="submissions-${Date.now()}.xlsx"`);
      res.send(buffer);
    } else {
      res.status(400).json({ error: 'Invalid format. Use csv or xlsx' });
    }
  } catch (error) {
    console.error('Error exporting submissions:', error);
    res.status(500).json({ error: 'Failed to export submissions' });
  }
});

// Start server
app.listen(PORT, async () => {
  await dbPromise; // Wait for DB connection attempt
  await initializeDefaultAdmin(); // Ensure admin user is initialized
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📅 Appointment endpoint: http://localhost:${PORT}/api/appointments`);
  console.log(`✉️  Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🔐 Admin login: http://localhost:${PORT}/api/auth/login`);
  console.log(`📊 Admin submissions: http://localhost:${PORT}/api/submissions`);
  console.log(`📝 Default login: username="admin", password="admin123"`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});
