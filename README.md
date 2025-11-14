# Gallena Medical Centre

Gallena Medical Centre Website
A modern, responsive, and user-friendly website for Gallena Medical Centre, designed to improve patient engagement, showcase services, and streamline access to medical information and appointments.

## Overview

The Gallena Medical Centre Website serves as a digital hub for patients and healthcare providers. It features an intuitive interface, optimized performance, and a professional design that reflects the medical center’s commitment to quality healthcare.
Key Objectives:
Present Gallena Medical Centre’s services, departments, and team professionally.
Enable patients to book appointments online.
Provide quick access to contact details, location, and emergency information.
Enhance visibility through SEO and responsive design.

## React + Vite + Tailwind Setup

Prerequisites: Node 18+ and npm.

1. Install dependencies

```
npm install
```

2. Start dev server

```
npm run dev
```

3. Build for production

```
npm run build && npm run preview
```

Project entry: `index.html` → `src/main.tsx` → `src/App.tsx`

Routes: Home `/`, Services `/services`, Staff `/staff`, Blog `/blog`, Contact `/contact`.

Forms: Appointment form on Home and Contact form are front-end ready. Replace simulated requests with your API endpoint (e.g., `/api/appointments`).

## Carbon Design System Integration

- The app now imports `@carbon/styles/css/styles.css` and wraps the router inside Carbon’s `Theme` provider (configured to the `g90` theme) in `src/main.tsx`. Update the `theme` prop or layer classes if you need a different Carbon theme token.
- `App.tsx` uses Carbon’s `<Grid>` and `<Column>` primitives to align the main route content and footer while leaving the existing custom components intact. Use the same Grid helpers when introducing new surface sections.
- Tailwind utilities still power most component styling, but Carbon tokens/utility classes are available via the loaded stylesheets. Prefer Carbon tokens (e.g., `var(--cds-layer)` colors) when you touch shared styles going forward.
- Reference Carbon’s React Getting Started guide for additional patterns and components: [Carbon React docs](https://react.carbondesignsystem.com/?path=/docs/getting-started-welcome--welcome&globals=theme:g90).

## Backend Integration

- Deploy the Express API (`server.js`) to your hosting platform (Render, Railway, Fly.io, etc.).
- Set `JWT_SECRET`, database credentials, and email settings in the backend environment.
- Expose the deployed base URL to the frontend via `VITE_API_ROOT`; the app will call `VITE_API_ROOT + /api/...` for authentication and admin data.
- Configure `VITE_API_ENDPOINT` and `VITE_CONTACT_API_ENDPOINT` if you want appointment/contact forms to hit different services.
- Restart the Vite dev server (or redeploy Netlify) after updating environment variables.
