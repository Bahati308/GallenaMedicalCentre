import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Column } from '@carbon/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollBg from './components/ScrollBg';
import Home from './pages/Home';
import Services from './pages/Services';
import Staff from './pages/Staff';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import ContactFloat from './components/ContactFloat';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div
      id="app-bg"
      className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-black cds--layer"
    >
      <Helmet>
        <title>Gallena Medical Centre</title>
        <meta
          name="description"
          content="Gallena Medical Centre offers comprehensive healthcare: general medicine, dental, maternity, surgery, and more. Book a consultation today."
        />
        <meta property="og:title" content="Gallena Medical Centre" />
        <meta
          property="og:description"
          content="Modern, trusted healthcare. Book your consultation online."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ScrollBg />
      <Header />
      <main className="flex-1 w-full py-6">
        <Grid fullWidth className="w-full px-4 lg:px-6">
          <Column lg={16} md={8} sm={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Column>
        </Grid>
      </main>
      <Footer />
      <Chatbot />
      <ContactFloat />
    </div>
  );
}
