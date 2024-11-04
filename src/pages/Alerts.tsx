import React from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: 'danger',
      title: 'High-Risk Clause Detected',
      description: 'Liability cap in Contract Agreement.pdf requires immediate attention',
      date: '2024-02-20T10:30:00',
      status: 'urgent'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Expiring Soon',
      description: 'NDA with Client XYZ expires in 30 days',
      date: '2024-02-19T15:45:00',
      status: 'pending'
    },
    {
      id: 3,
      type: 'info',
      title: 'Analysis Complete',
      description: 'Terms of Service.pdf has been analyzed successfully',
      date: '2024-02-18T09:15:00',
      status: 'resolved'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      urgent: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Mark All as Read
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <span className={getStatusBadge(alert.status)}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(alert.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}