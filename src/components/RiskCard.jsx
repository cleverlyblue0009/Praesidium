const RiskCard = ({ area, status, reason }) => (
  <article className="risk-card">
    <div className="risk-header">
      <h3>{area}</h3>
      <span className="risk-status">{status}</span>
    </div>
    <p>{reason}</p>
  </article>
);

export default RiskCard;
