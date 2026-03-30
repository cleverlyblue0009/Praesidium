const LifecycleTracker = ({ stages, currentStage }) => (
  <div className="lifecycle-tracker">
    {stages.map((stage, index) => (
      <div key={stage} className={`stage ${index <= currentStage ? 'active' : ''}`}>
        <span className="dot" />
        <p>{stage}</p>
      </div>
    ))}
  </div>
);

export default LifecycleTracker;
