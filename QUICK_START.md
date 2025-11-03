# Quick Start Guide - All Features

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment (Optional for Development)

```bash
cp .env.example .env
# Edit .env if you want to configure MongoDB, email, etc.
```

### 3. Start Everything

```bash
npm run dev:full
```

This starts both:

- Frontend (Vite) on `http://localhost:5173`
- Backend (Express) on `http://localhost:3000`

## 🔐 Access Admin Panel

1. Visit: `http://localhost:5173/admin`
2. You'll be redirected to login
3. Default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

## ✨ Features Available

### ✅ Authentication

- Login required to access admin panel
- JWT token-based sessions
- Automatic logout on expiration

### ✅ Database (MongoDB)

- Automatic connection to MongoDB
- Falls back to file storage if MongoDB unavailable
- Data persists across restarts

### ✅ Email Notifications

- Automatic emails on form submission
- Configure SMTP in `.env` (see `PRODUCTION_SETUP.md`)

### ✅ Export Data

- Export CSV or Excel
- Click buttons in admin panel
- Downloads automatically

## 📝 What Happens When Forms Are Submitted

1. **Form validated** (client-side)
2. **Data sent to API** (`/api/appointments` or `/api/contact`)
3. **Data saved to MongoDB** (or file if MongoDB unavailable)
4. **Email notification sent** (if configured)
5. **Success message shown** to user
6. **Form resets** automatically

## 🗄️ Database Setup (Optional)

### Option 1: Use File Storage (Default)

- Works out of the box
- Data saved to `submissions.json`
- No setup required

### Option 2: MongoDB (Recommended for Production)

1. Install MongoDB locally OR use MongoDB Atlas
2. Update `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=gallena-medical
   ```
3. Restart server

## 📧 Email Setup (Optional)

1. Get SMTP credentials (Gmail, SendGrid, etc.)
2. Update `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   RECIPIENT_EMAIL=gallenamedicalcentre@gmail.com
   ```
3. Restart server

## 🎯 Testing

1. **Submit a form** on the homepage
2. **Check admin panel** - should see submission
3. **Check server console** - should see logs
4. **Check email** (if configured) - should receive notification
5. **Export data** - click export buttons

## 📚 Documentation

- `FEATURES_SUMMARY.md` - Detailed feature overview
- `PRODUCTION_SETUP.md` - Production deployment guide
- `VIEW_SUBMISSIONS.md` - How to view submissions
- `FORM_HANDLING.md` - Form submission details

## 🆘 Troubleshooting

### Can't access admin panel

- Make sure backend server is running (`npm run server`)
- Check browser console for errors

### Forms not submitting

- Check backend server is running
- Check browser console for errors
- Verify API endpoints in network tab

### MongoDB connection errors

- Server will fall back to file storage automatically
- Check MongoDB is running (if using local)
- Verify connection string in `.env`

### Email not sending

- Check SMTP credentials in `.env`
- Check server console for email errors
- Verify email service allows SMTP access

---

**Everything is ready to use!** Start the server and test the features. 🎉
