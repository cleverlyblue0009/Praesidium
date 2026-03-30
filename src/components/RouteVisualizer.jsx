const statusIcon = {
  safe: '#2fdc9b',
  caution: '#f2994a',
  risk: '#ff3860'
};

const RouteVisualizer = ({ nodes }) => (
  <div className="route-visualizer card-glow">
    <div className="route-line">
      {nodes.map((node, index) => (
        <div key={`${node.label}-${index}`} className="route-node">
          <span style={{ background: statusIcon[node.status] }} />
          <p>{node.label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default RouteVisualizer;
