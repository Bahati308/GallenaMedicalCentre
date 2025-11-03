// Form data handler utilities
// Supports multiple backend options: API endpoint, EmailJS, Formspree, etc.

export interface AppointmentFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDateTime: string;
  department: string;
  message?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

/**
 * Submit appointment form data to backend API
 */
export async function submitAppointmentForm(
  data: AppointmentFormData
): Promise<{ success: boolean; message?: string }> {
  // Option 1: API Endpoint (Recommended)
  // Replace with your actual API endpoint
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/appointments';

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status-based message
        if (response.status === 404) {
          errorMessage =
            `API endpoint not found (404). The endpoint "${API_ENDPOINT}" does not exist.\n\n` +
            `To fix this:\n` +
            `1. Set up your backend API at this endpoint, OR\n` +
            `2. Create a .env file with: VITE_API_ENDPOINT=your-actual-api-url\n` +
            `3. See FORM_HANDLING.md for more options`;
        } else if (response.status === 500) {
          errorMessage = 'Server error (500). Please try again later or contact support.';
        }
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error submitting appointment:', error);
    // If it's a network error (not an HTTP error), provide helpful message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to API endpoint "${API_ENDPOINT}".\n\n` +
          `This usually means:\n` +
          `- The backend server is not running\n` +
          `- The endpoint URL is incorrect\n` +
          `- Check your .env file configuration\n\n` +
          `See FORM_HANDLING.md for setup instructions.`
      );
    }
    throw error;
  }
}

/**
 * Submit contact form data to backend API
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message?: string }> {
  const API_ENDPOINT = import.meta.env.VITE_CONTACT_API_ENDPOINT || '/api/contact';

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status-based message
        if (response.status === 404) {
          errorMessage =
            `API endpoint not found (404). The endpoint "${API_ENDPOINT}" does not exist.\n\n` +
            `To fix this:\n` +
            `1. Set up your backend API at this endpoint, OR\n` +
            `2. Create a .env file with: VITE_CONTACT_API_ENDPOINT=your-actual-api-url\n` +
            `3. See FORM_HANDLING.md for more options`;
        } else if (response.status === 500) {
          errorMessage = 'Server error (500). Please try again later or contact support.';
        }
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // If it's a network error (not an HTTP error), provide helpful message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to API endpoint "${API_ENDPOINT}".\n\n` +
          `This usually means:\n` +
          `- The backend server is not running\n` +
          `- The endpoint URL is incorrect\n` +
          `- Check your .env file configuration\n\n` +
          `See FORM_HANDLING.md for setup instructions.`
      );
    }
    throw error;
  }
}

/**
 * Alternative: EmailJS integration
 *
 * IMPORTANT: To use this function, you must first install the package:
 *   npm install @emailjs/browser
 *
 * This function is optional and only available if the package is installed.
 * Since we're using Option 1 (Custom API Endpoint), this function is not required.
 */
export async function submitViaEmailJS(
  serviceId: string,
  templateId: string,
  publicKey: string,
  formData: AppointmentFormData | ContactFormData
): Promise<{ success: boolean; message?: string }> {
  // Dynamic import using string concatenation to prevent Vite from analyzing at build time
  const emailjsPackage = '@emailjs/browser';
  const emailjsModule = await import(/* @vite-ignore */ emailjsPackage).catch(() => null);

  if (!emailjsModule || !emailjsModule.send) {
    throw new Error(
      'EmailJS package not found. Install it with: npm install @emailjs/browser\n' +
        'If you want to use EmailJS, install the package and this function will work automatically.'
    );
  }

  try {
    const templateParams = {
      ...formData,
      to_email: import.meta.env.VITE_RECIPIENT_EMAIL || 'gallenamedicalcentre@gmail.com',
    };

    await emailjsModule.send(serviceId, templateId, templateParams, publicKey);
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
}

/**
 * Alternative: Formspree integration
 * No package needed, just POST to Formspree endpoint
 */
export async function submitViaFormspree(
  formId: string,
  formData: AppointmentFormData | ContactFormData
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Formspree error: ${response.status}`);
    }

    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Formspree error:', error);
    throw error;
  }
}

/**
 * Netlify Forms integration (if using Netlify)
 * Form must have data-netlify="true" attribute
 */
export async function submitViaNetlify(
  formName: string,
  formData: AppointmentFormData | ContactFormData
): Promise<{ success: boolean; message?: string }> {
  try {
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSubmit.append(key, value);
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataToSubmit as unknown as Record<string, string>).toString(),
    });

    if (!response.ok) {
      throw new Error(`Netlify Forms error: ${response.status}`);
    }

    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Netlify Forms error:', error);
    throw error;
  }
}
