import { Routes, Route } from 'react-router-dom';
import { Grid, Column } from '@carbon/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollBg from './components/ScrollBg';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
import ContactFloat from './components/ContactFloat';

export default function App() {
  return (
    <div
      id="app-bg"
      className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 bg-white dark:bg-black cds--layer"
    >
      <ScrollBg />
      <Header />
      <main className="flex-1 w-full py-6">
        <Grid fullWidth className="w-full px-4 lg:px-6">
          <Column lg={16} md={8} sm={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postSlug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
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
