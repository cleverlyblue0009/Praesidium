const DashboardCards = ({ stats }) => (
  <div className="dashboard-grid">
    {stats.map((stat) => (
      <article className="dashboard-card" key={stat.label}>
        <p className="card-label">{stat.label}</p>
        <h3>{stat.value}</h3>
        <span className="card-detail">{stat.detail}</span>
      </article>
    ))}
  </div>
);

export default DashboardCards;
