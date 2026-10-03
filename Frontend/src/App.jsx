import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AccountLayout } from './components/AccountLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Public Pre-Login Pages
import { Home } from './pages/public/Home';
import { Impact } from './pages/public/Impact';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

// Donor & Shared Feature Pages
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { DonationForm } from './pages/donor/DonationForm';
import { MyDonations } from './pages/donor/MyDonations';

// NGO Feature Pages
import { AvailableDonations } from './pages/ngo/AvailableDonations';
import { MyRequests } from './pages/ngo/MyRequests';

// Admin Feature Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageNGOs } from './pages/admin/ManageNGOs';
import { ManageDonors } from './pages/admin/ManageDonors';
import { AdminDonations } from './pages/admin/AdminDonations';

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const App = () => {
  const { user } = useAuth();

  const getAccountRedirect = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/account/dashboard';
    if (user.role === 'NGO') return '/account/available-donations';
    if (user.role === 'ADMIN') return '/account/ngo-requests';
    return '/';
  };

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={getAccountRedirect()} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={getAccountRedirect()} />} />
      </Route>

      {/* Authenticated Account Portals */}
      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<Navigate to={getAccountRedirect()} replace />} />

        {/* DONOR Only */}
        <Route element={<ProtectedRoute allowedRoles={['DONOR']} />}>
          <Route path="dashboard" element={<DonorDashboard />} />
        </Route>

        {/* Both DONOR and NGO */}
        <Route element={<ProtectedRoute allowedRoles={['DONOR', 'NGO']} />}>
          <Route path="donate" element={<DonationForm />} />
          <Route path="my-donations" element={<MyDonations />} />
        </Route>

        {/* NGO Only */}
        <Route element={<ProtectedRoute allowedRoles={['NGO']} />}>
          <Route path="available-donations" element={<AvailableDonations />} />
          <Route path="my-requests" element={<MyRequests />} />
        </Route>

        {/* ADMIN Only */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="ngo-requests" element={<AdminDashboard />} />
          <Route path="manage-ngos" element={<ManageNGOs />} />
          <Route path="manage-donors" element={<ManageDonors />} />
          <Route path="donations" element={<AdminDonations />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;