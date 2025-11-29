# Form Data Handling Guide - Google Sheets Integration

This guide explains how to configure form submissions to save data directly to Google Sheets using Google Apps Script.

## Overview

The forms are configured to use **Google Apps Script (GAS)** which writes data directly to Google Sheets. This is a free, serverless solution that requires no backend hosting.

## How It Works

1. Form submissions are sent to a Google Apps Script Web App
2. The script processes the data and writes it to a Google Sheet
3. You can view all submissions in your Google Sheet

## Setup Instructions

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Gallena Medical Centre - Form Submissions"
4. Create two sheets:
   - **Sheet 1**: Name it "Appointments"
   - **Sheet 2**: Name it "Contact"

### Step 2: Set Up Headers in Google Sheets

#### For Appointments Sheet:

In row 1, add these column headers:

```
Full Name | Email | Phone | Preferred Date & Time | Department | Message | Timestamp
```

#### For Contact Sheet:

In row 1, add these column headers:

```
Full Name | Email | Message | Timestamp
```

### Step 3: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code
3. Copy and paste the following code:

```javascript
// Configuration
const APPOINTMENTS_SHEET_NAME = 'Appointments';
const CONTACT_SHEET_NAME = 'Contact';

/**
 * Handle appointment form submissions
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.type === 'contact' ? CONTACT_SHEET_NAME : APPOINTMENTS_SHEET_NAME;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: `Sheet "${sheetName}" not found` })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Get headers from first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Prepare row data based on form type
    let rowData = [];

    if (data.type === 'contact') {
      // Contact form: Full Name | Email | Message | Timestamp
      rowData = [
        data.fullName || '',
        data.email || '',
        data.message || '',
        new Date().toISOString(),
      ];
    } else {
      // Appointment form: Full Name | Email | Phone | Preferred Date & Time | Department | Message | Timestamp
      rowData = [
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.preferredDateTime || '',
        data.department || '',
        data.message || '',
        new Date().toISOString(),
      ];
    }

    // Append row to sheet
    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Form submitted successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script is running!').setMimeType(
    ContentService.MimeType.TEXT
  );
}
```

4. Click **Save** (💾) and give your project a name like "Gallena Form Handler"

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Form submission handler v1"
   - **Execute as**: "Me" (your email)
   - **Who has access**: **"Anyone"** (Important! This allows your website to submit forms)
4. Click **Deploy**
5. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
6. Click **Authorize access** and grant permissions when prompted

### Step 5: Create Separate Scripts for Each Form (Recommended)

For better organization, create two separate Google Apps Script projects:

#### Script 1: Appointments Handler

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Appointments');

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Appointments sheet not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const rowData = [
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.preferredDateTime || '',
      data.department || '',
      data.message || '',
      new Date().toISOString(),
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Appointment submitted successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### Script 2: Contact Handler

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contact');

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Contact sheet not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const rowData = [
      data.fullName || '',
      data.email || '',
      data.message || '',
      new Date().toISOString(),
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Deploy each script separately and get their Web App URLs.

### Step 6: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Google Apps Script Web App URLs
VITE_GAS_APPOINTMENTS_URL=https://script.google.com/macros/s/YOUR_APPOINTMENTS_SCRIPT_ID/exec
VITE_GAS_CONTACT_URL=https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec
```

**Important Notes:**

- Replace `YOUR_APPOINTMENTS_SCRIPT_ID` and `YOUR_CONTACT_SCRIPT_ID` with your actual script IDs
- Environment variables must start with `VITE_` to be accessible in the frontend
- Do NOT commit `.env` to version control (it should be in `.gitignore`)
- Restart your dev server after creating/updating `.env` file

### Step 7: Test Your Setup

1. Start your development server: `npm run dev`
2. Fill out the appointment form on your website
3. Check your Google Sheet - you should see a new row with the submitted data
4. Test the contact form as well

## Troubleshooting

### Forms Not Submitting

1. **Check Web App URL**: Ensure the URL in `.env` is correct
2. **Check Permissions**: Make sure the Web App is deployed with "Anyone" access
3. **Check Sheet Names**: Ensure sheet names match exactly (case-sensitive)
4. **Check Headers**: Verify column headers are in row 1
5. **Check Browser Console**: Look for error messages

### CORS Errors

If you see CORS errors:

- Google Apps Script handles CORS automatically when deployed as a Web App
- Ensure you're using the Web App URL (not the script editor URL)
- The code uses `no-cors` mode for GAS, which is correct

### Data Not Appearing in Sheet

1. Check that the sheet names match exactly
2. Verify the script has permission to edit the sheet
3. Check the Apps Script execution log: **Executions** in the Apps Script editor
4. Ensure headers are in row 1

### Testing the Script Directly

You can test your script using `curl`:

```bash
# Test appointment form
curl -X POST "YOUR_APPOINTMENTS_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "preferredDateTime": "2024-01-15T10:00",
    "department": "General Consultation",
    "message": "Test message"
  }'

# Test contact form
curl -X POST "YOUR_CONTACT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "message": "Test contact message"
  }'
```

## Form Data Structure

### Appointment Form

```typescript
{
  fullName: string;
  email: string;
  phone: string;
  preferredDateTime: string; // ISO format: "2024-01-15T10:00"
  department: string;
  message?: string; // optional
}
```

### Contact Form

```typescript
{
  fullName: string;
  email: string;
  message: string;
}
```

## Advanced: Email Notifications

You can add email notifications to your Apps Script:

```javascript
function doPost(e) {
  // ... existing code to write to sheet ...

  // Send email notification
  const recipientEmail = 'gallenamedicalcentre@gmail.com';
  const subject =
    data.type === 'contact' ? 'New Contact Form Submission' : 'New Appointment Request';

  const emailBody =
    data.type === 'contact'
      ? `New contact form submission:\n\nName: ${data.fullName}\nEmail: ${data.email}\nMessage: ${data.message}`
      : `New appointment request:\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nDate/Time: ${data.preferredDateTime}\nDepartment: ${data.department}\nMessage: ${data.message || 'None'}`;

  MailApp.sendEmail(recipientEmail, subject, emailBody);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, message: 'Form submitted successfully' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Security Notes

- Google Apps Script Web Apps are secure when deployed with "Anyone" access
- The script only writes to your specific Google Sheet
- No API keys are exposed in the frontend
- All data is stored securely in your Google Drive
- You can restrict access to the Google Sheet if needed

## Benefits of Google Sheets Integration

✅ **Free** - No hosting costs  
✅ **Easy Setup** - No backend server required  
✅ **Real-time Data** - View submissions immediately  
✅ **Exportable** - Easy to export data to CSV/Excel  
✅ **Collaborative** - Share sheet with team members  
✅ **Searchable** - Built-in search and filter capabilities  
✅ **Reliable** - Google's infrastructure handles scaling

## Next Steps

1. Set up your Google Sheet with proper headers
2. Create and deploy your Google Apps Script
3. Add the Web App URLs to your `.env` file
4. Test both forms
5. (Optional) Set up email notifications
6. Share the Google Sheet with your team if needed

---

**Need Help?** Check the [Google Apps Script Documentation](https://developers.google.com/apps-script)
