import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import { Home, Compass, Ticket, Briefcase, UserCircle, Settings, MapPin, Search, X, Twitter, Instagram, Facebook } from 'lucide-react';

import { AppProvider, useStore } from './store';
import { LandingPage, FestivalsPage, FestivalDetailPage, ExperienceDetailPage, CheckoutPage, OrdersPage, LiveMapPage, HostDashboardPage, AdminPage, StoryTrailPage } from './pages/Pages';

const Header: React.FC = () => {
  const { state } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-100 text-[--color-indigo-dark]' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${
    isActive ? 'bg-indigo-100 text-[--color-indigo-dark]' : 'text-gray-700 hover:bg-gray-100'
  }`;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold font-serif text-[--color-indigo-dark]">
              Festive India
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/festivals" className={navLinkClasses}><Compass size={18} /><span>Festivals</span></NavLink>
            <NavLink to="/hosts/dashboard" className={navLinkClasses}><Briefcase size={18} /><span>For Hosts</span></NavLink>
            <NavLink to="/admin" className={navLinkClasses}><Settings size={18} /><span>Admin</span></NavLink>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/orders" className="relative text-gray-600 hover:text-[--color-terracotta]">
              <Ticket size={24} />
              {state.cart.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[--color-terracotta] text-xs text-white">
                  {state.cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
                {isMenuOpen ? <X size={24}/> : <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
          <nav className="space-y-1">
            <NavLink to="/festivals" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Festivals</NavLink>
            <NavLink to="/hosts/dashboard" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>For Hosts</NavLink>
            <NavLink to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-100 border-t mt-16">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-bold font-serif text-[--color-indigo-dark]">Festive India</h3>
          <p className="mt-2 text-gray-500 text-sm">Curated cultural experiences from the heart of India's festivals.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-gray-600"><Twitter size={20}/></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><Facebook size={20}/></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><Instagram size={20}/></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/festivals" className="text-gray-600 hover:text-black">Festivals</Link></li>
            <li><Link to="/experiences" className="text-gray-600 hover:text-black">Experiences</Link></li>
             <li><Link to="/storytrails" className="text-gray-600 hover:text-black">Story Trails</Link></li>
          </ul>
        </div>
         <div>
          <h4 className="font-semibold text-gray-800">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-gray-600 hover:text-black">About Us</Link></li>
            <li><Link to="/hosts" className="text-gray-600 hover:text-black">Become a Host</Link></li>
             <li><Link to="/contact" className="text-gray-600 hover:text-black">Contact</Link></li>
          </ul>
        </div>
         <div>
          <h4 className="font-semibold text-gray-800">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/legal/terms" className="text-gray-600 hover:text-black">Terms of Service</Link></li>
            <li><Link to="/legal/privacy" className="text-gray-600 hover:text-black">Privacy Policy</Link></li>
            <li><Link to="/legal/safety" className="text-gray-600 hover:text-black">Safety</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Festive India. All rights reserved.</p>
      </div>
    </div>
  </footer>
);


const App: React.FC = () => {
  const [globalAlert, setGlobalAlert] = useState<{ message: string; type: 'info' | 'warning' } | null>(null);

  useEffect(() => {
    // This would typically come from a global state store like Zustand or Redux
    // Simulating it here for demonstration
    const handleAlert = (event: Event) => {
      const customEvent = event as CustomEvent;
      setGlobalAlert({ message: customEvent.detail.message, type: 'warning' });
      setTimeout(() => setGlobalAlert(null), 5000); // Auto-dismiss after 5 seconds
    };
    window.addEventListener('global-alert', handleAlert);
    return () => window.removeEventListener('global-alert', handleAlert);
  }, []);

  return (
    <AppProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          {globalAlert && (
            <div className={`p-4 text-center text-white ${globalAlert.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-500'}`}>
              {globalAlert.message}
            </div>
          )}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/festivals/:slug" element={<FestivalDetailPage />} />
              <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/map/:festivalSlug" element={<LiveMapPage />} />
              <Route path="/storytrails/:festivalSlug" element={<StoryTrailPage />} />
              <Route path="/hosts/dashboard" element={<HostDashboardPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Add other routes like /legal/* as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;