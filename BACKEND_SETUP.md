# Backend API Setup Guide

The API endpoints have been created! You now have two options:

## Option 1: Local Development Server (Express.js)

A local Express.js server for development.

### Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Start the backend server:**

```bash
npm run server
```

The server will run on `http://localhost:3000`

3. **Start frontend and backend together:**

```bash
npm run dev:full
```

This runs both the frontend (Vite) and backend (Express) simultaneously.

### API Endpoints

- **Appointment Form:** `POST http://localhost:3000/api/appointments`
- **Contact Form:** `POST http://localhost:3000/api/contact`
- **Health Check:** `GET http://localhost:3000/api/health`

### How It Works

- The Vite dev server automatically proxies `/api/*` requests to `http://localhost:3000`
- Forms will work automatically when both servers are running

## Option 2: Netlify Functions (Production)

For production deployment on Netlify, serverless functions are set up.

### Files Created

- `netlify/functions/appointments.js` - Handles appointment submissions
- `netlify/functions/contact.js` - Handles contact form submissions
- Updated `netlify.toml` - Routes configured

### Deployment

When you deploy to Netlify, these functions will automatically:

- Handle requests to `/api/appointments`
- Handle requests to `/api/contact`

No additional setup needed! Just deploy your site.

## Adding Business Logic

Both endpoints currently log submissions to the console. To make them production-ready, add:

### For Appointment Endpoint

```javascript
// In server.js or netlify/functions/appointments.js

// Save to database
await saveToDatabase(data);

// Send email notification
await sendEmailNotification({
  to: 'gallenamedicalcentre@gmail.com',
  subject: `New Appointment Request from ${data.fullName}`,
  body: `...`,
});

// Send SMS notification
await sendSMSNotification(data.phone, 'Your appointment request has been received');

// Add to calendar/CRM
await addToCalendar(data);
```

### For Contact Endpoint

```javascript
// In server.js or netlify/functions/contact.js

// Save to database
await saveToDatabase(data);

// Send email notification
await sendEmailNotification({
  to: 'gallenamedicalcentre@gmail.com',
  subject: `New Contact Form Submission from ${data.fullName}`,
  body: data.message,
});

// Add to ticketing system
await createTicket(data);
```

## Testing

### Test Appointment Endpoint

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 123 4567",
    "preferredDateTime": "2024-01-15T10:00",
    "department": "General Medicine",
    "message": "Test appointment"
  }'
```

### Test Contact Endpoint

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "message": "Test message"
  }'
```

## Environment Variables

No `.env` configuration needed for local development! The forms automatically use:

- `http://localhost:3000/api/appointments` (via Vite proxy)
- `http://localhost:3000/api/contact` (via Vite proxy)

For production (Netlify), the functions handle the routes automatically.

## Troubleshooting

### Port Already in Use

If port 3000 is taken, change it:

```bash
PORT=3001 npm run server
```

### CORS Errors

The server includes CORS headers, but if you see CORS errors:

1. Make sure the backend server is running
2. Check that Vite proxy is configured correctly
3. Verify the API endpoint URLs

## Next Steps

1. ✅ Start the backend: `npm run server`
2. ✅ Start the frontend: `npm run dev` (in another terminal)
3. ✅ Test the forms - they should work now!
4. ⚠️ Add database/email logic (see "Adding Business Logic" above)
5. 🚀 Deploy to Netlify when ready
