# Quick Setup: Where Form Data Goes

## Current Configuration

**No .env file configured** - Forms are using default relative URLs:

- Appointment Form → `/api/appointments`
- Contact Form → `/api/contact`

## To Configure Your API Endpoints:

### Step 1: Create .env file

```bash
cp .env.example .env
```

### Step 2: Edit .env with your endpoints

```env
# For example, if your API is at:
VITE_API_ENDPOINT=https://api.gallenamedicalcentre.com/appointments
VITE_CONTACT_API_ENDPOINT=https://api.gallenamedicalcentre.com/contact

# Or for local development:
# VITE_API_ENDPOINT=http://localhost:3000/api/appointments
# VITE_CONTACT_API_ENDPOINT=http://localhost:3000/api/contact
```

### Step 3: Restart your dev server

```bash
npm run dev
```

## What Happens When Form is Submitted:

1. User fills out form
2. Form validates input
3. Data is sent via POST request to your configured endpoint
4. Data format (JSON):
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
5. Your backend API receives the data and processes it
6. Form shows success/error message based on API response

## Where the Logic Lives:

- **Form Handler**: `src/utils/formHandler.ts` (lines 22-77)
- **Appointment Form**: `src/pages/Home.tsx` (line 434)
- **Contact Form**: `src/pages/Contact.tsx` (line 78)
