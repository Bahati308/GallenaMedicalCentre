# Quick Fix for 404 Error

You're getting a 404 error because the API endpoints (`/api/appointments` and `/api/contact`) don't exist yet.

## Option 1: Quick Fix - Use Formspree (No Backend Required) ⚡

Formspree is a free service that handles form submissions without requiring a backend.

### Step 1: Get a Formspree Form ID

1. Go to [formspree.io](https://formspree.io) and sign up (free)
2. Create a new form
3. Copy your form ID (it looks like: `xy123abc`)

### Step 2: Update Your Code

**For Appointment Form** (`src/pages/Home.tsx` line ~434):

```typescript
// Replace this line:
await submitAppointmentForm(formData);

// With this:
await submitViaFormspree('YOUR_APPOINTMENT_FORM_ID', formData);
```

**For Contact Form** (`src/pages/Contact.tsx` line ~78):

```typescript
// Replace this line:
await submitContactForm(formData);

// With this:
await submitViaFormspree('YOUR_CONTACT_FORM_ID', formData);
```

Don't forget to import:

```typescript
import { submitViaFormspree } from '../utils/formHandler';
```

## Option 2: Set Up Your Backend API

Create backend endpoints that match:

- `POST /api/appointments` - for appointment form
- `POST /api/contact` - for contact form

Or configure different endpoints in `.env`:

```env
VITE_API_ENDPOINT=https://your-backend.com/appointments
VITE_CONTACT_API_ENDPOINT=https://your-backend.com/contact
```

## Option 3: Temporary Development Mode

If you just want to test the form UI without backend, you can temporarily comment out the API call:

```typescript
// Temporarily skip API call for development
// await submitAppointmentForm(formData);

// Simulate success
await new Promise((r) => setTimeout(r, 500));
```

**Note:** This won't actually save the data, but lets you test the form UI.

---

**Recommended:** Use Option 1 (Formspree) for immediate functionality, then switch to Option 2 when your backend is ready.
