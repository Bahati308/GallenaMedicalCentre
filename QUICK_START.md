# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets Integration

1. Follow the instructions in `FORM_HANDLING.md` to set up Google Sheets
2. Create your Google Apps Script Web Apps
3. Add the URLs to your `.env` file:

```env
VITE_GAS_APPOINTMENTS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GAS_CONTACT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Start Development Server

```bash
npm run dev
```

This starts the frontend on `http://localhost:5173`

## ✨ Features Available

### ✅ Form Submissions

- Appointment booking form
- Contact form
- Data saved directly to Google Sheets
- Real-time updates in your spreadsheet

### ✅ Google Sheets Integration

- Automatic data saving
- Organized by form type
- Timestamp tracking
- Easy to export and share

## 📝 What Happens When Forms Are Submitted

1. **Form validated** (client-side)
2. **Data sent to Google Apps Script**
3. **Data saved to Google Sheet** automatically
4. **Success message shown** to user
5. **Form resets** automatically

## 🎯 Testing

1. **Submit a form** on the homepage
2. **Check your Google Sheet** - should see submission immediately
3. **Test both forms** - appointments and contact

## 📚 Documentation

- `FORM_HANDLING.md` - Detailed Google Sheets setup guide
- `VIEW_SUBMISSIONS.md` - How to view submissions
- `SEO_GUIDE.md` - SEO optimization guide

## 🆘 Troubleshooting

### Forms not submitting

- Check Google Apps Script Web App URL in `.env`
- Verify Web App is deployed with "Anyone" access
- Check browser console for errors
- See `FORM_HANDLING.md` for detailed troubleshooting

### Data not appearing in sheet

- Check sheet names match exactly (case-sensitive)
- Verify headers are in row 1
- Check Apps Script execution log
- Ensure script has permission to edit the sheet

---

**Everything is ready to use!** Set up Google Sheets and start receiving form submissions. 🎉
