import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function Documents() {
  const [documents] = useState([
    { id: '1', title: 'Contract Agreement.pdf', status: 'analyzed', date: '2024-02-20' },
    { id: '2', title: 'Terms of Service.pdf', status: 'flagged', date: '2024-02-19' },
    { id: '3', title: 'NDA.pdf', status: 'pending', date: '2024-02-18' }
  ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      toast.success(`Uploading ${acceptedFiles.length} document(s)`);
      // Handle file upload logic here
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'flagged':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Legal Documents</h1>
      </div>

      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}>
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                      <span className="ml-2 text-sm text-gray-600 capitalize">{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/analysis/${doc.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}