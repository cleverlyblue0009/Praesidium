const PredictiveAlertCard = ({ level, heading, message, explanation }) => (
  <article className="predictive-card card-glow">
    <div className="alert-level">{level}</div>
    <div className="predictive-content">
      <h3>{heading}</h3>
      <p>{message}</p>
      <small>{explanation}</small>
    </div>
  </article>
);

export default PredictiveAlertCard;
