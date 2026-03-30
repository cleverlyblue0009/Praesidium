import { useMemo, useState } from 'react';
import DashboardCards from './components/DashboardCards';
import PredictiveAlertCard from './components/PredictiveAlertCard';
import IncidentChart from './components/IncidentChart';
import CommunityFlagCard from './components/CommunityFlagCard';
import ReportCard from './components/ReportCard';
import LifecycleTracker from './components/LifecycleTracker';
import FeedCard from './components/FeedCard';
import SOSButton from './components/SOSButton';
import AlertModal from './components/AlertModal';
import RouteVisualizer from './components/RouteVisualizer';
import RiskCard from './components/RiskCard';
import EvidenceCard from './components/EvidenceCard';
import OfflineBanner from './components/OfflineBanner';

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'reports', label: 'Reports' },
  { key: 'alert', label: 'Alert' },
  { key: 'feed', label: 'Feed' },
  { key: 'safety', label: 'Safety' }
];

const reportFilters = ['All', 'Active', 'Pending', 'Resolved'];

const dashboardStats = [
  { label: 'Active cases', value: '08', detail: 'Immediate follow-up' },
  { label: 'Resolved', value: '26', detail: 'Closed this week' },
  { label: 'Safety score', value: '74', detail: 'City average 65' }
];

const incidentFrequency = [
  { label: '00h', value: 35 },
  { label: '02h', value: 28 },
  { label: '04h', value: 22 },
  { label: '06h', value: 30 },
  { label: '08h', value: 45 },
  { label: '10h', value: 60 },
  { label: '12h', value: 55 },
  { label: '14h', value: 62 },
  { label: '16h', value: 58 },
  { label: '18h', value: 66 },
  { label: '20h', value: 52 },
  { label: '22h', value: 38 }
];

const communityFlags = [
  { location: 'Silk Board Signal', risk: 'High traffic, pickpocket zone' },
  { location: 'Koramangala 5th Block', risk: 'Frequent harassment near pubs' },
  { location: 'Murugeshpalya Flyover', risk: 'Poor lighting, stray vehicles' },
  { location: 'Indiranagar 1st Stage', risk: 'Weekend biker clashes' }
];

const reports = [
  {
    title: 'Unauthorized entry on campus',
    location: 'Koramangala',
    timestamp: 'Today · 18:45',
    status: 'Active',
    stage: 1
  },
  {
    title: 'Crowd surge near metro',
    location: 'M.G. Road',
    timestamp: 'Today · 16:20',
    status: 'Pending',
    stage: 0
  },
  {
    title: 'Harassment call',
    location: 'Jayanagar',
    timestamp: 'Yesterday · 22:10',
    status: 'Escalated',
    stage: 2
  }
];

const feedPosts = [
  {
    category: 'Harassment',
    description: 'Group of 5 verbally abusing passersby near 80 Ft Road.',
    location: 'Indiranagar · 21:05',
    timestamp: 'Just now',
    verification: 12
  },
  {
    category: 'Unsafe area',
    description: 'Dark alley behind Forum Mall with broken cameras.',
    location: 'Koramangala · 19:30',
    timestamp: '10 mins ago',
    verification: 9
  },
  {
    category: 'Harassment',
    description: 'Unknown scooter following a group of students.',
    location: 'Silk Board · 18:55',
    timestamp: '30 mins ago',
    verification: 7
  }
];

const routeNodes = [
  { label: 'Home', status: 'safe' },
  { label: 'Bus Stop', status: 'caution' },
  { label: 'Silk Board', status: 'risk' },
  { label: 'Office', status: 'safe' }
];

const areaRisks = [
  {
    area: 'Silk Board',
    status: 'Caution',
    reason: 'Vehicle congestion + low lighting'
  },
  {
    area: 'Koramangala',
    status: 'Risk',
    reason: 'Frequent reports of harassment'
  },
  {
    area: 'Brigade Rd',
    status: 'Caution',
    reason: 'Crowd + transit bottlenecks'
  }
];

const evidenceItems = [
  {
    file: 'incident-4893.mp4',
    uploaded: 'Mar 29 · 22:13',
    hash: '3b6f2c9e4f3a1a1c6d7e8f3b5a2d4c6b7e8f9a1b2c3d4e5f6a7b8c9d0e1f2a3'
  },
  {
    file: 'voice-note-911.wav',
    uploaded: 'Mar 29 · 21:56',
    hash: '8d4a3c9f2b8d5a7231c7e8f6b0a5c3d4e6f7a8b9c0d1e2f3b4a5c6d7e8f9012'
  },
  {
    file: 'chat-logs-1504.txt',
    uploaded: 'Mar 28 · 14:20',
    hash: '2b5d4f6c8a9e1b48702d3f5a6c8b0d1e2f3a4b5c6d7e8f9012b3c4d5e6f7a8c9'
  }
];

const pendingComplaints = [
  'Escort request · Silk Board',
  'Follow-up · Indiranagar',
  'Evidence upload pending · Brigade Rd'
];

const predictiveAlert = {
  level: 'Warning',
  heading: 'Predictive alert',
  message: 'Violence likelihood rises after 21:00 on all main corridors.',
  explanation: 'Based on recent reports + time patterns'
};

const safetyAlert = {
  level: 'Caution',
  heading: 'Predictive alert',
  message: 'Community reports highlight Brig Rd intersections after 19:00.',
  explanation: 'Based on community reports + time trends'
};

const hourlyTrend = [
  { label: '1 AM', value: 18 },
  { label: '3 AM', value: 25 },
  { label: '6 AM', value: 12 },
  { label: '9 AM', value: 28 },
  { label: '12 PM', value: 36 },
  { label: '3 PM', value: 48 },
  { label: '6 PM', value: 63 },
  { label: '9 PM', value: 58 }
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [alertOpen, setAlertOpen] = useState(false);
  const [showLocker, setShowLocker] = useState(false);
  const currentReport = reports[0];

  const verifiedFeed = useMemo(
    () => feedPosts.filter((_, index) => index < 2),
    []
  );

  return (
    <div className="app-shell">
      <OfflineBanner pendingList={pendingComplaints} />

      <div className="screen-wrapper">
        {activeScreen === 'home' && (
          <section className="screen home-screen">
            <header className="screen-header">
              <div>
                <p className="meta-label">Good Evening</p>
                <h1>VIGIL</h1>
              </div>
              <p className="meta-value">Personal Safety Intelligence</p>
            </header>

            <DashboardCards stats={dashboardStats} />

            <PredictiveAlertCard {...predictiveAlert} />

            <section className="incident-section card-glow">
              <div className="section-title">
                <p>Incident Frequency</p>
                <span>Bar Chart</span>
              </div>
              <IncidentChart data={incidentFrequency} />
            </section>

            <section className="community-section">
              <div className="section-title">
                <p>Community Flags</p>
                <span>Risky Locations</span>
              </div>
              <div className="flag-grid">
                {communityFlags.map((flag) => (
                  <CommunityFlagCard key={flag.location} {...flag} />
                ))}
              </div>
            </section>

            <section className="hyperlocal">
              <div className="section-title">
                <p>Recent incidents in your area</p>
                <span>Hyperlocal intelligence</span>
              </div>
              <div className="hyperlocal-grid">
                {verifiedFeed.map((feed) => (
                  <FeedCard key={feed.description} {...feed} />
                ))}
              </div>
            </section>
          </section>
        )}

        {activeScreen === 'reports' && (
          <section className="screen reports-screen">
            <header className="screen-header spaced">
              <div>
                <p className="meta-label">My Reports</p>
                <h2>Complaint Tracking</h2>
              </div>
              <button className="primary-button">+ File New Complaint</button>
            </header>

            <div className="filters">
              {reportFilters.map((filter) => (
                <button key={filter} className="filter-pill">
                  {filter}
                </button>
              ))}
            </div>

            <div className="report-stack">
              {reports.map((report) => (
                <div key={report.title} className="report-block">
                  <ReportCard {...report} />
                  <LifecycleTracker stages={['Filed', 'Review', 'Escalated', 'Closed']} currentStage={report.stage} />
                  <p className="timeline-note">
                    Timeline shows how the case is advancing. Reports stack up for regional guardians
                    and actionable teams.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeScreen === 'feed' && (
          <section className="screen feed-screen">
            <header className="screen-header">
              <div>
                <p className="meta-label">Live Feed</p>
                <h2>Reports near you</h2>
              </div>
              <span className="verified-indicator">Verified reports</span>
            </header>

            <div className="feed-stack">
              {feedPosts.map((post) => (
                <FeedCard key={`${post.description}-${post.timestamp}`} {...post} />
              ))}
            </div>
          </section>
        )}

        {activeScreen === 'alert' && (
          <section className="screen alert-screen">
            <header className="screen-header">
              <div>
                <p className="meta-label">Emergency</p>
                <h2>Immediate Alert</h2>
              </div>
            </header>
            <div className="alert-center">
              <SOSButton onActivate={() => setAlertOpen(true)} />
            </div>
            <p className="alert-note">Tap SOS to trigger the emergency protocol and notify responders.</p>
          </section>
        )}

        {activeScreen === 'safety' && (
          <section className="screen safety-screen">
            <header className="screen-header spaced">
              <div>
                <p className="meta-label">Route Safety</p>
                <h2>Predictive Risk View</h2>
              </div>
              <button className="ghost-button" onClick={() => setShowLocker((prev) => !prev)}>
                Evidence Locker
              </button>
            </header>

            <div className="safety-row">
              <RouteVisualizer nodes={routeNodes} />
              <div className="safety-score-panel">
                <p>Score</p>
                <h1>72</h1>
                <div className="score-labels">
                  <span>Safe</span>
                  <span>Caution</span>
                  <span>Risk</span>
                </div>
                <p className="tiny-note">Real-time aggregated safety index</p>
              </div>
            </div>

            <div className="risk-cards">
              {areaRisks.map((area) => (
                <RiskCard key={area.area} {...area} />
              ))}
            </div>

            <PredictiveAlertCard {...safetyAlert} />

            <section className="incident-section">
              <div className="section-title">
                <p>Hourly frequency</p>
                <span>Trend</span>
              </div>
              <IncidentChart data={hourlyTrend} />
            </section>

            {showLocker && (
              <section className="evidence-locker card-glow">
                <div className="locker-header">
                  <h3>Evidence Locker</h3>
                  <span>Tamper-proof audit trail</span>
                </div>
                <div className="evidence-grid">
                  {evidenceItems.map((item) => (
                    <EvidenceCard key={item.file} {...item} />
                  ))}
                </div>
              </section>
            )}
          </section>
        )}
      </div>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-pill ${activeScreen === item.key ? 'active' : ''}`}
            onClick={() => setActiveScreen(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {alertOpen && <AlertModal onClose={() => setAlertOpen(false)} />}
    </div>
  );
}

export default App;
