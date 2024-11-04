import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, FileText, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">LegalAI Assistant</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/documents" 
              className={`flex items-center space-x-1 ${isActive('/documents')}`}
            >
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </Link>
            
            <Link 
              to="/alerts" 
              className={`flex items-center space-x-1 ${isActive('/alerts')}`}
            >
              <Bell className="h-5 w-5" />
              <span>Alerts</span>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}