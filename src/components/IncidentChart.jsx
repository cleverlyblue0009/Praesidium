const IncidentChart = ({ data }) => {
  const max =
    data.reduce((acc, point) => Math.max(acc, point.value), 0) || 1;

  return (
    <div className="chart-grid">
      {data.map((point) => (
        <div key={point.label} className="chart-bar">
          <div
            className="chart-fill"
            style={{ height: `${(point.value / max) * 100}%` }}
          />
          <span>{point.label}</span>
        </div>
      ))}
    </div>
  );
};

export default IncidentChart;
