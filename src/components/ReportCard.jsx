const ReportCard = ({ title, location, timestamp, status }) => (
  <article className="report-card">
    <div className="report-head">
      <h3>{title}</h3>
      <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
    </div>
    <p className="report-location">{location}</p>
    <small>{timestamp}</small>
  </article>
);

export default ReportCard;
