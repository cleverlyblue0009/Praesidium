import { useMemo, useState } from 'react';
import AuthorityApp from './AuthorityApp';

const roles = [
  { value: 'user', label: 'User Access' },
  { value: 'authority', label: 'Authority' }
];

const AuthorityEntry = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [role, setRole] = useState('authority');
  const [isAuthority, setIsAuthority] = useState(false);

  const handleChange = (field) => (event) => {
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === 'authority') {
      setIsAuthority(true);
    } else {
      window.location.href = '/';
    }
  };

  const helperText = useMemo(
    () =>
      role === 'authority'
        ? 'Secure entry for java-county authorities monitoring every report.'
        : 'Return to the VIGIL user dashboard to continue tracking your personal safety.',
    [role]
  );

  if (isAuthority) {
    return <AuthorityApp />;
  }

  return (
    <main className="auth-login-shell">
      <section className="auth-login-card">
        <p className="auth-greeting">Authority Access Required</p>
        <h1>VIGIL Control</h1>
        <p className="auth-helper">{helperText}</p>
        <form className="auth-login-form" onSubmit={handleSubmit}>
          <label>
            email
            <input
              type="email"
              name="email"
              placeholder="name@domain.com"
              required
              value={credentials.email}
              onChange={handleChange('email')}
            />
          </label>
          <label>
            password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={credentials.password}
              onChange={handleChange('password')}
            />
          </label>
          <label className="role-field">
            role
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="auth-submit">
            Continue
          </button>
        </form>
        <p className="return-user">
          <button type="button" onClick={() => (window.location.href = '/')}>
            Return to VIGIL User
          </button>
        </p>
      </section>
    </main>
  );
};

export default AuthorityEntry;
