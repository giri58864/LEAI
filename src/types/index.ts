export interface User {
  id: string;
  email: string;
  role: 'user' | 'advisor';
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  user_id: string;
  status: 'pending' | 'analyzed' | 'flagged';
  file_url: string;
  created_at: string;
  expiration_date?: string;
}

export interface Analysis {
  id: string;
  document_id: string;
  clauses: Clause[];
  risks: Risk[];
  created_at: string;
}

export interface Clause {
  type: string;
  content: string;
  risk_level: 'low' | 'medium' | 'high';
}

export interface Risk {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}