import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Analysis() {
  const { id } = useParams();

  const analysis = {
    document: {
      title: 'Contract Agreement.pdf',
      status: 'analyzed',
      date: '2024-02-20'
    },
    clauses: [
      {
        type: 'Termination',
        content: 'Either party may terminate this agreement with 30 days notice.',
        risk_level: 'medium'
      },
      {
        type: 'Liability',
        content: 'The total liability shall not exceed the total amount paid.',
        risk_level: 'high'
      },
      {
        type: 'Payment Terms',
        content: 'Payment shall be made within 45 days of invoice.',
        risk_level: 'low'
      }
    ],
    risks: [
      {
        type: 'Liability Cap',
        description: 'The liability cap may be insufficient for potential damages.',
        severity: 'high',
        recommendation: 'Consider negotiating a higher liability cap based on potential risk exposure.'
      },
      {
        type: 'Termination Notice',
        description: '30-day notice period may be too short for business continuity.',
        severity: 'medium',
        recommendation: 'Extend notice period to 60-90 days to allow for proper transition.'
      }
    ]
  };

  const getRiskBadge = (level: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level as keyof typeof colors]}`;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{analysis.document.title}</h1>
          <span className={getRiskBadge(analysis.risks[0].severity)}>
            High Risk Detected
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Analyzed on {new Date(analysis.document.date).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Clauses</h2>
          <div className="space-y-4">
            {analysis.clauses.map((clause, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900">{clause.type}</h3>
                  <span className={getRiskBadge(clause.risk_level)}>
                    {clause.risk_level.charAt(0).toUpperCase() + clause.risk_level.slice(1)} Risk
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{clause.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h2>
          <div className="space-y-4">
            {analysis.risks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {risk.severity === 'high' ? (
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  ) : risk.severity === 'medium' ? (
                    <Info className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{risk.type}</h3>
                    <p className="mt-1 text-sm text-gray-600">{risk.description}</p>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Recommendation:</span>{' '}
                        {risk.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}