// Netlify serverless function for contact form submissions
// Handles POST requests to /api/contact

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
    if (!data.fullName || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields',
          message: 'Please fill out all required fields.',
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
    // - Add to ticketing system

    // Example: Log the submission (in production, save to database)
    console.log('New contact form submission:', {
      fullName: data.fullName,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with your actual storage/notification logic
    // Examples:
    // - await saveToDatabase(data);
    // - await sendEmailNotification(data);
    // - await addToTicketingSystem(data);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully. We will get back to you shortly.',
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
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
