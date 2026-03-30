import { useEffect, useMemo, useState } from 'react';

const statusOptions = ['Pending', 'In Review', 'Escalated', 'Resolved'];

const ComplaintManagement = ({ complaints, onUpdate }) => {
  const [selectedComplaintId, setSelectedComplaintId] = useState(complaints[0]?.id ?? null);
  const [filters, setFilters] = useState({
    status: 'All',
    category: 'All',
    location: 'All'
  });
  const [search, setSearch] = useState('');
  const [detailStatus, setDetailStatus] = useState('');
  const [notes, setNotes] = useState('');

  const categoryOptions = useMemo(
    () => ['All', ...new Set(complaints.map((complaint) => complaint.category))],
    [complaints]
  );
  const locationOptions = useMemo(
    () => ['All', ...new Set(complaints.map((complaint) => complaint.location))],
    [complaints]
  );

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesStatus =
        filters.status === 'All' || complaint.status === filters.status;
      const matchesCategory =
        filters.category === 'All' || complaint.category === filters.category;
      const matchesLocation =
        filters.location === 'All' || complaint.location === filters.location;
      const matchesSearch =
        complaint.title.toLowerCase().includes(search.toLowerCase()) ||
        complaint.userId.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesCategory && matchesLocation && matchesSearch;
    });
  }, [complaints, filters, search]);

  useEffect(() => {
    if (
      !selectedComplaintId ||
      !filteredComplaints.some((complaint) => complaint.id === selectedComplaintId)
    ) {
      setSelectedComplaintId(filteredComplaints[0]?.id ?? null);
    }
  }, [filteredComplaints, selectedComplaintId]);

  useEffect(() => {
    if (selectedComplaintId) {
      const current = complaints.find((complaint) => complaint.id === selectedComplaintId);
      setDetailStatus(current?.status ?? '');
      setNotes(current?.notes ?? '');
    }
  }, [selectedComplaintId, complaints]);

  const selectedComplaint = complaints.find(
    (complaint) => complaint.id === selectedComplaintId
  );

  const handleUpdateStatus = () => {
    if (!selectedComplaint) return;
    onUpdate(selectedComplaint.id, detailStatus, notes);
  };

  const handleSaveNotes = () => {
    if (!selectedComplaint) return;
    onUpdate(selectedComplaint.id, selectedComplaint.status, notes);
  };

  return (
    <section className="complaint-management">
      <div className="filters-row">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, status: event.target.value }))
            }
          >
            {['All', ...statusOptions].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select
            value={filters.category}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, category: event.target.value }))
            }
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Location</label>
          <select
            value={filters.location}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, location: event.target.value }))
            }
          >
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group search-group">
          <label>Search</label>
          <input
            type="search"
            placeholder="Title or user ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="complaints-layout">
        <div className="complaints-list">
          {filteredComplaints.map((complaint) => (
            <article
              key={complaint.id}
              className={
                selectedComplaintId === complaint.id
                  ? 'complaint-card active'
                  : 'complaint-card'
              }
              onClick={() => setSelectedComplaintId(complaint.id)}
            >
              <div>
                <h3>{complaint.title}</h3>
                <p>{complaint.category}</p>
              </div>
              <div className="card-meta">
                <span>{complaint.userId}</span>
                <span className="status-pill">{complaint.status}</span>
              </div>
              <small>{complaint.timestamp}</small>
            </article>
          ))}
        </div>

        {selectedComplaint && (
          <aside className="complaint-detail">
            <div className="detail-section">
              <h4>Complaint Info</h4>
              <p className="detail-title">{selectedComplaint.title}</p>
              <p className="detail-sub">
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <p>{selectedComplaint.description}</p>
            </div>

            <div className="detail-section">
              <h4>User Info</h4>
              <p>
                <strong>ID:</strong> {selectedComplaint.userId}
              </p>
              <p>
                <strong>Contact:</strong> {selectedComplaint.contact}
              </p>
            </div>

            <div className="detail-section location-section">
              <h4>Location</h4>
              <div className="map-preview">
                <span>Map preview</span>
                <strong>{selectedComplaint.coordinates}</strong>
              </div>
            </div>

            <div className="detail-section evidence-section">
              <h4>Evidence</h4>
              {selectedComplaint.evidence.map((item) => (
                <div key={item.name} className="evidence-row">
                  <div>
                    <strong>{item.name}</strong>
                    <p className="muted">{item.timestamp}</p>
                  </div>
                  <div className="evidence-hash">
                    <p>{item.hash}</p>
                    <span className="verified-pill">Verified</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h4>Status Control</h4>
              <div className="status-control">
                <select
                  value={detailStatus}
                  onChange={(event) => setDetailStatus(event.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button type="button" className="primary-button" onClick={handleUpdateStatus}>
                  Update Status
                </button>
              </div>
            </div>

            <div className="detail-section">
              <h4>Action Notes</h4>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Save rationale, witness updates, or escalation notes."
              />
              <button type="button" className="secondary-button" onClick={handleSaveNotes}>
                Save Notes
              </button>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default ComplaintManagement;
