// Netlify serverless function for appointment form submissions
// Handles POST requests to /api/appointments

export const handler = async (event, _context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body || '{}');

    // Validate required fields
    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.preferredDateTime ||
      !data.department
    ) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields',
          message: 'Please complete all required fields.',
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Invalid email format',
          message: 'Please enter a valid email address.',
        }),
      };
    }

    // Here you can add code to:
    // - Save to database
    // - Send email notification
    // - Send SMS notification
    // - Add to calendar/CRM system

    // Example: Log the submission (in production, save to database)
    console.log('New appointment request:', {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      preferredDateTime: data.preferredDateTime,
      department: data.department,
      message: data.message || 'No additional message',
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with your actual storage/notification logic
    // Examples:
    // - await saveToDatabase(data);
    // - await sendEmailNotification(data);
    // - await sendSMSNotification(data);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Appointment request received successfully. We will contact you shortly.',
      }),
    };
  } catch (error) {
    console.error('Error processing appointment:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.',
      }),
    };
  }
};
