const UserDetails = ({ users }) => (
  <section className="user-details-panel">
    <header className="panel-header">
      <div>
        <p className="meta-label">User Intelligence</p>
        <h3>Recent activity</h3>
      </div>
    </header>
    <div className="user-grid">
      {users.map((user) => (
        <article key={user.id} className="user-card">
          <div className="user-head">
            <h4>{user.name}</h4>
            <span>{user.id}</span>
          </div>
          <p className="muted">Complaints filed</p>
          <strong>{user.complaintsCount}</strong>
          <ul>
            {user.recentActivity.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default UserDetails;
