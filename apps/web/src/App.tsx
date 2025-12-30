import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { TopicProvider } from './context/TopicContext';
import './App.css';

import Notes from './pages/Notes';
import GraphWorkspace from './pages/GraphWorkspace';
import { GlobalModals } from './components/GlobalModals';

function App() {
  return (
    <ThemeProvider>
      <TopicProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Onboarding */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Application Routes (Dashboard Layout) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="notes" element={<Notes />} />
              <Route path="mind-map" element={<GraphWorkspace />} />
            </Route>

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <GlobalModals />
        </BrowserRouter>
      </TopicProvider>
    </ThemeProvider >
  );
}

export default App;
