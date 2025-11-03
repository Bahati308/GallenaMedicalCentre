# Form Data Handling Guide

This guide explains how to configure form data handling for the appointment and contact forms.

## Current Implementation

The forms are **configured to use Custom API Endpoints** (Option 1). You need to set up your backend API and configure the endpoints.

## Setup: Custom API Endpoint (Currently Active)

### Step 1: Create Environment Variables

**Option A: Copy the example file (Recommended)**

```bash
cp .env.example .env
```

Then edit `.env` and update with your actual API endpoints.

**Option B: Create manually**

Create a `.env` file in the root directory:

```env
VITE_API_ENDPOINT=https://your-api.com/api/appointments
VITE_CONTACT_API_ENDPOINT=https://your-api.com/api/contact
```

**Example endpoints:**

```env
# Local development
VITE_API_ENDPOINT=http://localhost:3000/api/appointments
VITE_CONTACT_API_ENDPOINT=http://localhost:3000/api/contact

# Production
VITE_API_ENDPOINT=https://api.gallenamedicalcentre.com/appointments
VITE_CONTACT_API_ENDPOINT=https://api.gallenamedicalcentre.com/contact
```

> **Note:** A `.env.example` file is included in the repository as a template. Copy it to `.env` and fill in your values.

### Step 2: Verify Code Configuration

The forms are already configured to use the API:

- `src/pages/Home.tsx` - Uses `submitAppointmentForm(formData)`
- `src/pages/Contact.tsx` - Uses `submitContactForm(formData)`

No code changes needed! Just configure your `.env` file.

### Step 3: Backend API Requirements

Your backend API should accept POST requests with JSON data:

**Appointment Form Data:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555 123 4567",
  "preferredDateTime": "2024-01-15T10:00",
  "department": "General Medicine",
  "message": "Optional message"
}
```

## Option 2: Formspree (No Backend Required)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update `src/pages/Home.tsx`:

```typescript
import { submitViaFormspree } from '../utils/formHandler';

// In onSubmit function:
await submitViaFormspree('your-form-id', formData);
```

### Option 3: EmailJS (Send Emails Directly)

1. Install EmailJS:

```bash
npm install @emailjs/browser
```

2. Sign up at [emailjs.com](https://www.emailjs.com)
3. Configure your service, template, and get your public key
4. Update `src/pages/Home.tsx`:

```typescript
import { submitViaEmailJS } from '../utils/formHandler';

// In onSubmit function:
await submitViaEmailJS('your-service-id', 'your-template-id', 'your-public-key', formData);
```

### Option 4: Netlify Forms (If Using Netlify)

1. Add `data-netlify="true"` to your form element
2. Update `src/pages/Home.tsx`:

```typescript
import { submitViaNetlify } from '../utils/formHandler';

// In onSubmit function:
await submitViaNetlify('appointment-form', formData);
```

## Environment Variables Setup

**Create a `.env` file in the root directory** with your API endpoints:

```env
# API Endpoints (Required - Currently Active)
VITE_API_ENDPOINT=https://your-api.com/api/appointments
VITE_CONTACT_API_ENDPOINT=https://your-api.com/api/contact
```

**Important Notes:**

- Environment variables must start with `VITE_` to be accessible in the frontend
- If endpoints are not set, forms will default to `/api/appointments` and `/api/contact`
- Restart your dev server after creating/updating `.env` file
- Do NOT commit `.env` to version control (it should be in `.gitignore`)

**For other options (if switching later):**

```env
# EmailJS (if using Option 3)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Recipient email
VITE_RECIPIENT_EMAIL=gallenamedicalcentre@gmail.com
```

## Form Data Structure

### Appointment Form

```typescript
{
  fullName: string;
  email: string;
  phone: string;
  preferredDateTime: string;
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

## Error Handling

The form handler includes comprehensive error handling:

- Network errors are caught and displayed to users
- Validation errors are shown inline
- Loading states prevent duplicate submissions

## Testing

1. For development, the form currently simulates submission (setTimeout)
2. Test with your chosen service in development mode
3. Monitor browser console for any errors

## Security Notes

- Never expose API keys in client-side code (use environment variables)
- Implement rate limiting on your backend
- Validate and sanitize all input on the server
- Use HTTPS for all API endpoints
- Consider adding CAPTCHA for production
