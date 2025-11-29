# How to View Submitted Form Data

Form submissions are saved directly to Google Sheets. Here's how to view them:

## Method 1: Google Sheets (Recommended) 🎯

### Access Your Google Sheet

1. **Open your Google Sheet** where form submissions are saved
2. **Navigate to the appropriate sheet tab:**
   - **Appointments** tab - for appointment form submissions
   - **Contact** tab - for contact form submissions

### Features

- View all submissions in real-time
- Sort and filter data
- Export to CSV or Excel
- Share with team members
- Search and organize submissions

## Method 2: Google Apps Script Logs

If you've set up email notifications in your Apps Script, you'll receive email alerts when forms are submitted.

## Data Structure

### Appointment Form Submissions

Columns in the Appointments sheet:

- Full Name
- Email
- Phone
- Preferred Date & Time
- Department
- Message
- Timestamp

### Contact Form Submissions

Columns in the Contact sheet:

- Full Name
- Email
- Message
- Timestamp

## Setting Up Google Sheets Integration

See `FORM_HANDLING.md` for detailed instructions on:

- Creating Google Sheets
- Setting up Google Apps Script
- Configuring form submissions
- Adding email notifications

## Quick Start

1. Follow the setup in `FORM_HANDLING.md`
2. Submit a test form on your website
3. Check your Google Sheet - you should see the submission appear immediately

That's it! 🎉
