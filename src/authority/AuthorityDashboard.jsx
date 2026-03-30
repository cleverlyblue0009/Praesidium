const AuthorityDashboard = ({ stats, preview }) => {
  const cards = [
    { label: 'Total complaints', value: stats.total },
    { label: 'Pending cases', value: stats.pending },
    { label: 'Escalated cases', value: stats.escalated },
    { label: 'Resolved cases', value: stats.resolved }
  ];

  return (
    <section className="authority-dashboard">
      <div className="summary-cards">
        {cards.map((card) => (
          <article key={card.label} className="summary-card">
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </div>

      <div className="dashboard-preview">
        <div className="preview-header">
          <h3>Recent complaints</h3>
          <span>Live tracking feed</span>
        </div>
        <div className="preview-list">
          {preview.map((complaint) => (
            <article key={complaint.id} className="preview-item">
              <div>
                <h4>{complaint.title}</h4>
                <p>{complaint.location}</p>
              </div>
              <span className="status-pill">{complaint.status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityDashboard;
