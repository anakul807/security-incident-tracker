import React from 'react';
import { Download, Plus, Search } from 'lucide-react';

const API_URL = 'http://localhost:8085/api';

export const incidents = [
  {
    id: 'INC-001',
    title: 'Suspicious login attempts detected',
    priority: 'Critical',
    status: 'In Progress',
    category: 'Unauthorized Access',
    assignedTo: 'John Smith',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'INC-002',
    title: 'Malware detected on endpoint',
    priority: 'High',
    status: 'Open',
    category: 'Malware',
    assignedTo: 'John Smith',
    lastUpdated: '4 hours ago'
  },
  {
    id: 'INC-003',
    title: 'DDoS attack on web server',
    priority: 'Critical',
    status: 'In Progress',
    category: 'DDoS',
    assignedTo: 'John Smith',
    lastUpdated: '6 hours ago'
  },
  {
    id: 'INC-004',
    title: 'Phishing email campaign reported',
    priority: 'Medium',
    status: 'Resolved',
    category: 'Phishing',
    assignedTo: 'John Smith',
    lastUpdated: '1 day ago'
  },
  {
    id: 'INC-005',
    title: 'Data exfiltration attempt blocked',
    priority: 'High',
    status: 'Resolved',
    category: 'Phishing',
    assignedTo: 'John Smith',
    lastUpdated: '2 days ago'
  },
   
];

export default incidents;