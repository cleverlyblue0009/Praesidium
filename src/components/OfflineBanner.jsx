const OfflineBanner = ({ pendingList }) => (
  <section className="offline-banner">
    <div className="offline-message">
      <p>Offline Mode</p>
      <span className="sync-label">Sync pending</span>
    </div>
    <div className="pending-store">
      <p>Store: pending complaints</p>
      <div className="pending-list">
        {pendingList.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  </section>
);

export default OfflineBanner;
