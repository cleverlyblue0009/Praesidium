const AlertModal = ({ onClose }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-card" onClick={(event) => event.stopPropagation()}>
      <h3>Emergency Alert Triggered</h3>
      <p>
        The local safety network has been notified and responders are en route. Keep your
        device visible and follow the on-screen prompts.
      </p>
      <button className="safe-button" onClick={onClose}>
        SAFE
      </button>
    </div>
  </div>
);

export default AlertModal;
