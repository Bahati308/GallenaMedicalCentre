# Production Setup Guide

This guide covers setting up authentication, database, email, and export features for production.

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=gallena-medical
```

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=gallena-medical
```

## 🔐 Authentication Setup

### Change Default Admin Password

The default admin credentials are:

- Username: `admin`
- Password: `admin123`

**⚠️ CHANGE THIS IMMEDIATELY IN PRODUCTION!**

### Update Admin Password

1. Connect to MongoDB:

```bash
mongosh "mongodb://localhost:27017/gallena-medical"
```

2. Update password:

```javascript
// In MongoDB shell:
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('your-new-secure-password', 10);
db.users.updateOne({ username: 'admin' }, { $set: { password: hashedPassword } });
```

Or create a new admin user:

```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('secure-password', 10);
db.users.insertOne({
  username: 'admin',
  password: hashedPassword,
  role: 'admin',
  createdAt: new Date(),
});
```

### Environment Variables

```env
JWT_SECRET=your-super-secret-jwt-key-change-this
```

Generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Update `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=gallenamedicalcentre@gmail.com
```

### Other Email Providers

**Outlook:**

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**SendGrid:**

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-user
SMTP_PASS=your-mailgun-password
```

## 📊 Database Indexes

Indexes are automatically created, but you can verify:

```javascript
// In MongoDB shell:
db.appointments.getIndexes();
db.contact.getIndexes();
db.users.getIndexes();
```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET
- [ ] Use HTTPS in production
- [ ] Set secure CORS origins
- [ ] Enable MongoDB authentication
- [ ] Regular database backups
- [ ] Monitor failed login attempts
- [ ] Set up rate limiting
- [ ] Use environment variables for all secrets

## 🌐 Environment Variables Summary

Create a `.env` file with:

```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017
DB_NAME=gallena-medical

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=gallenamedicalcentre@gmail.com
```

## 🚀 Deployment

### Netlify Functions

The Netlify functions need to be updated to support MongoDB. Update:

- `netlify/functions/appointments.js`
- `netlify/functions/contact.js`

Add MongoDB connection and authentication middleware.

### Vercel / Other Platforms

1. Set environment variables in your platform's dashboard
2. Ensure MongoDB Atlas allows connections from your server's IP
3. Update connection strings

## 📝 Testing

### Test Authentication

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Use token to access submissions
curl http://localhost:3000/api/submissions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Email

Submit a form and check:

1. Server console for email send status
2. Your email inbox for the notification

### Test Export

1. Login to admin panel
2. Click "Export CSV" or "Export Excel"
3. Verify file downloads correctly

## 🔄 Backup Strategy

### MongoDB Backup

```bash
# Backup
mongodump --uri="mongodb://localhost:27017" --db=gallena-medical --out=/backup

# Restore
mongorestore --uri="mongodb://localhost:27017" --db=gallena-medical /backup/gallena-medical
```

### Automated Backups

Set up a cron job or use MongoDB Atlas automated backups.

## 📞 Support

If you encounter issues:

1. Check server console logs
2. Verify MongoDB connection
3. Test email configuration separately
4. Check environment variables are set correctly
