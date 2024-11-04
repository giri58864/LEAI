import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Analysis from './pages/Analysis';
import Alerts from './pages/Alerts';
import Auth from './pages/Auth';
import AuthGuard from './components/AuthGuard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route element={<AuthGuard>
              <>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/analysis/:id" element={<Analysis />} />
                    <Route path="/alerts" element={<Alerts />} />
                  </Routes>
                </main>
              </>
            </AuthGuard>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analysis/:id" element={<Analysis />} />
              <Route path="/alerts" element={<Alerts />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;