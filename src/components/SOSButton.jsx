const SOSButton = ({ onActivate }) => (
  <button className="sos-button" onClick={onActivate}>
    <span>SOS</span>
    <small>Emergency Alert</small>
  </button>
);

export default SOSButton;
