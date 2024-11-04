import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Documents Analyzed', value: '24', icon: FileText, color: 'bg-blue-500' },
    { name: 'Risk Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Pending Reviews', value: '8', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Active Advisors', value: '12', icon: Users, color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to LegalAI Assistant</h1>
        <p className="text-gray-600">
          Your intelligent legal document analysis platform. Upload documents, get instant analysis,
          and receive expert advice from legal professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h2>
          <div className="space-y-4">
            {['Contract Agreement.pdf', 'Terms of Service.pdf', 'NDA.pdf'].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{doc}</span>
                </div>
                <Link to="/analysis/1" className="text-indigo-600 hover:text-indigo-500 text-sm">
                  View Analysis
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {[
              { text: 'Contract expiring in 30 days', type: 'warning' },
              { text: 'High-risk clause detected', type: 'danger' },
              { text: 'New advisor comment', type: 'info' }
            ].map((alert, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  alert.type === 'danger'
                    ? 'bg-red-50 text-red-700'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">{alert.text}</span>
                </div>
                <Link to="/alerts" className="text-sm font-medium hover:underline">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}