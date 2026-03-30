import { useMemo, useState } from 'react';
import AuthorityDashboard from './AuthorityDashboard';
import ComplaintManagement from './ComplaintManagement';
import EvidenceViewer from './EvidenceViewer';
import UserDetails from './UserDetails';

const initialComplaints = [
  {
    id: 'CMP-042',
    title: 'Unauthorized gathering near Koramangala lakefront',
    category: 'Public Safety',
    userId: 'USR-129',
    userName: 'Anika S.',
    location: 'Koramangala Lakefront',
    timestamp: 'Mar 29 · 23:10',
    status: 'Pending',
    description: 'Large unpermitted crowd is blocking the walkway; multiple reports of aggression toward bystanders.',
    contact: '+91 98100 44021',
    coordinates: '12.9446° N · 77.6219° E',
    evidence: [
      {
        name: 'crowd-042.jpg',
        timestamp: 'Mar 29 · 23:12',
        hash: '3b6f2c9e4f3a1a1c6d7e8f3b5a2d4c6b7e8f9a1b2c3d4e5f6a7b8c9d0e1f2a3',
        type: 'image'
      },
      {
        name: 'call-logs-042.pdf',
        timestamp: 'Mar 29 · 23:15',
        hash: '0f3b5c2d9a8f6b4c7e1d2f8b6a3c4d5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
        type: 'document'
      }
    ],
    notes: 'Awaiting regional unit clearance.'
  },
  {
    id: 'CMP-041',
    title: 'Roadside harassment near Brigade Rd',
    category: 'Harassment',
    userId: 'USR-121',
    userName: 'Raghav P.',
    location: 'Brigade Road · Bangalore',
    timestamp: 'Mar 29 · 22:05',
    status: 'In Review',
    description: 'Motorcycle gang surrounding pedestrians and shouting threats while blocking frontage.',
    contact: '+91 99000 11122',
    coordinates: '12.9784° N · 77.6066° E',
    evidence: [
      {
        name: 'dashcam-041.mp4',
        timestamp: 'Mar 29 · 22:07',
        hash: '8d4a3c9f2b8d5a7231c7e8f6b0a5c3d4e6f7a8b9c0d1e2f3b4a5c6d7e8f9012',
        type: 'video'
      }
    ],
    notes: 'Checking CCTV feeds for additional angles.'
  },
  {
    id: 'CMP-038',
    title: 'Suspicious loiterers near Silk Board metro exit',
    category: 'Suspicious Activity',
    userId: 'USR-104',
    userName: 'Sonia N.',
    location: 'Silk Board Metro Exit 4',
    timestamp: 'Mar 29 · 20:40',
    status: 'Escalated',
    description: 'Group of individuals assembling around a vehicle; reported intimidation to commuters.',
    contact: '+91 98451 66771',
    coordinates: '12.9289° N · 77.6170° E',
    evidence: [
      {
        name: 'silkboard-038.jpg',
        timestamp: 'Mar 29 · 20:43',
        hash: '1a2c3d4e5f60718293a4b5c6d7e8f9012a3b4c5d6e7f8091a2b3c4d5e6f70123',
        type: 'image'
      }
    ],
    notes: 'Escalated to rapid response squad.'
  },
  {
    id: 'CMP-035',
    title: 'Nighttime power outage along M.G. Road',
    category: 'Infrastructure',
    userId: 'USR-098',
    userName: 'Fatima K.',
    location: 'M.G. Road, Central District',
    timestamp: 'Mar 28 · 19:05',
    status: 'Resolved',
    description: 'Tree fall caused outage and crowding; power crews already deployed.',
    contact: '+91 99070 44555',
    coordinates: '12.9768° N · 77.6054° E',
    evidence: [
      {
        name: 'outage-035.png',
        timestamp: 'Mar 28 · 19:08',
        hash: '2b5d4f6c8a9e1b48702d3f5a6c8b0d1e2f3a4b5c6d7e8f9012b3c4d5e6f7a8c9',
        type: 'image'
      }
    ],
    notes: 'Site cleared; power restored.'
  }
];

const initialUsers = [
  {
    id: 'USR-129',
    name: 'Anika S.',
    complaintsCount: 3,
    recentActivity: ['Filed CMP-042', 'Forwarded CCTV to squad', 'Verified witness statements']
  },
  {
    id: 'USR-121',
    name: 'Raghav P.',
    complaintsCount: 5,
    recentActivity: ['Filed CMP-041', 'Tagged evidence', 'Confirmed harasser description']
  },
  {
    id: 'USR-098',
    name: 'Fatima K.',
    complaintsCount: 2,
    recentActivity: ['Filed CMP-035', 'Confirmed power restore']
  }
];

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'complaints', label: 'Complaints' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'users', label: 'Users' }
];

const AuthorityApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [complaints, setComplaints] = useState(initialComplaints);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((record) => record.status === 'Pending').length;
    const escalated = complaints.filter((record) => record.status === 'Escalated').length;
    const resolved = complaints.filter((record) => record.status === 'Resolved').length;

    return { total, pending, escalated, resolved };
  }, [complaints]);

  const evidenceList = useMemo(
    () => complaints.flatMap((caseRecord) => caseRecord.evidence),
    [complaints]
  );

  const handleUpdateComplaint = (id, status, notes) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id ? { ...complaint, status, notes } : complaint
      )
    );
  };

  const renderActive = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AuthorityDashboard
            stats={stats}
            preview={complaints.slice(0, 3)}
          />
        );
      case 'complaints':
        return (
          <ComplaintManagement
            complaints={complaints}
            onUpdate={handleUpdateComplaint}
          />
        );
      case 'evidence':
        return <EvidenceViewer evidence={evidenceList} />;
      case 'users':
        return <UserDetails users={initialUsers} />;
      default:
        return null;
    }
  };

  return (
    <div className="authority-shell">
      <aside className="authority-sidebar">
        <div className="authority-logo">
          <p>VIGIL</p>
          <span>Control Center</span>
        </div>
        <nav className="authority-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={activeTab === item.key ? 'nav-pill active' : 'nav-pill'}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="authority-meta">
          <p>Realtime sync</p>
          <strong>Secure channel</strong>
        </div>
      </aside>

      <main className="authority-content">
        <header className="authority-header">
          <div>
            <p className="meta-label">Authority Control Center</p>
            <h1>Command Oversight</h1>
          </div>
          <div className="authority-timestamp">
            <span>Updated · {new Date().toLocaleString()}</span>
          </div>
        </header>
        {renderActive()}
      </main>
    </div>
  );
};

export default AuthorityApp;
