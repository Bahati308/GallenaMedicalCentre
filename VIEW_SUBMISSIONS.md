# How to View Submitted Form Data

There are several ways to view the submitted form data:

## Method 1: Admin Page (Recommended) 🎯

### Access the Admin Page

1. **Start your servers:**

   ```bash
   npm run dev:full
   ```

2. **Open the admin page in your browser:**
   ```
   http://localhost:5173/admin
   ```

### Features

- View all appointment submissions
- View all contact form submissions
- Delete submissions
- Auto-refreshes every 30 seconds
- Clean, organized display

## Method 2: API Endpoints

### View All Submissions

```bash
curl http://localhost:3000/api/submissions
```

### View Only Appointments

```bash
curl http://localhost:3000/api/submissions/appointments
```

### View Only Contact Submissions

```bash
curl http://localhost:3000/api/submissions/contact
```

### Using Browser

Visit these URLs in your browser:

- `http://localhost:3000/api/submissions`
- `http://localhost:3000/api/submissions/appointments`
- `http://localhost:3000/api/submissions/contact`

## Method 3: Server Console Logs

When a form is submitted, the data is logged to the server console:

```bash
npm run server
```

You'll see logs like:

```
📅 New appointment request: { fullName: '...', email: '...', ... }
📊 Total appointments: 5
```

## Method 4: JSON File (Persistence)

Submissions are automatically saved to `submissions.json` in the project root. This file persists across server restarts.

**View the file:**

```bash
cat submissions.json
```

**Format:**

```json
{
  "appointments": [
    {
      "id": "1234567890",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1 555 123 4567",
      "preferredDateTime": "2024-01-15T10:00",
      "department": "General Medicine",
      "message": "Optional message",
      "timestamp": "2024-01-15T10:00:00.000Z"
    }
  ],
  "contact": [
    {
      "id": "1234567891",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "message": "Contact message",
      "timestamp": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

## Data Storage Details

### Current Implementation

- **In-memory storage** during runtime
- **File-based persistence** (`submissions.json`) across restarts
- Data is saved automatically when submissions are received

### Production Considerations

For production, you should:

1. **Use a database** (PostgreSQL, MongoDB, etc.)
2. **Remove the admin page** or add authentication
3. **Add encryption** for sensitive data
4. **Implement data retention policies**

### Next Steps to Add Database

Replace the in-memory storage with a database:

```javascript
// Example: Using MongoDB
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('gallena-medical');

// Save appointment
await db.collection('appointments').insertOne({
  ...data,
  timestamp: new Date(),
});

// Retrieve appointments
const appointments = await db.collection('appointments').find().toArray();
```

## Security Note

⚠️ **Important:** The admin page and API endpoints are currently **unprotected**. In production, add:

- Authentication (login required)
- Authorization (role-based access)
- HTTPS
- Rate limiting

## Quick Start

1. Start backend: `npm run server`
2. Start frontend: `npm run dev` (in another terminal)
3. Submit a test form
4. Visit `http://localhost:5173/admin` to view submissions

That's it! 🎉
