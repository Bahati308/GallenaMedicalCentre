import { Helmet } from 'react-helmet-async';
import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Is the backend running?');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      // Redirect to admin page
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Admin Login | Gallena Medical Centre</title>
      </Helmet>
      <div className="container-1120 max-w-md">
        <div className="card card-3d">
          <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
          <p className="text-slate-600 text-center mb-6">Access the admin panel</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-slate-900">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input-modern"
                placeholder="Enter username"
                autoFocus
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold text-slate-900">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input-modern"
                placeholder="Enter password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-3d w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p className="font-semibold mb-2">Default Credentials (Development):</p>
            <p>
              Username: <code className="bg-white px-2 py-1 rounded">admin</code>
            </p>
            <p>
              Password: <code className="bg-white px-2 py-1 rounded">admin123</code>
            </p>
            <p className="mt-2 text-xs text-red-600">⚠️ Change these in production!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
