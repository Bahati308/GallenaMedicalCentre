import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredDateTime?: string;
  department?: string;
  message?: string;
  timestamp: string;
}

export default function Admin() {
  const [appointments, setAppointments] = useState<Submission[]>([]);
  const [contact, setContact] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'contact'>('appointments');
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  function getAuthHeaders() {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/submissions', {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        // Try to get error message
        let errorMessage = 'Failed to fetch submissions';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Is the backend running?');
      }

      const data = await response.json();
      setAppointments(data.appointments || []);
      setContact(data.contact || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSubmissions();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSubmissions, 30000);
    return () => clearInterval(interval);
  }, [fetchSubmissions]);

  async function deleteSubmission(type: 'appointments' | 'contact', id: string) {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/submissions/${type}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }
      // Refresh the list
      fetchSubmissions();
    } catch (err) {
      alert('Failed to delete submission');
      console.error('Error deleting submission:', err);
    }
  }

  async function exportData(
    format: 'csv' | 'xlsx',
    typeOverride?: 'appointments' | 'contact' | 'all'
  ) {
    try {
      setExporting(true);
      const type = typeOverride || (activeTab === 'appointments' ? 'appointments' : 'contact');
      const response = await fetch(`/api/submissions/export/${format}?type=${type}`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      // Get filename from Content-Disposition header or create default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `submissions-${Date.now()}.${format}`;
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches[1]) filename = matches[1];
      }

      // Download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to export data');
      console.error('Error exporting:', err);
    } finally {
      setExporting(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  }

  const currentSubmissions = activeTab === 'appointments' ? appointments : contact;
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  return (
    <section className="py-16">
      <Helmet>
        <title>Admin - View Submissions | Gallena Medical Centre</title>
      </Helmet>
      <div className="container-1120">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Form Submissions</h1>
            <p className="text-slate-600">View and manage submitted forms</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Logged in as: <strong>{adminUser.username}</strong>
            </span>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
            {error}
            <br />
            <small>Make sure the backend server is running on port 3000</small>
          </div>
        )}

        {/* Export buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => exportData('csv')}
            disabled={exporting || currentSubmissions.length === 0}
            className="btn btn-outline disabled:opacity-50"
          >
            {exporting
              ? 'Exporting...'
              : `Export ${activeTab === 'appointments' ? 'Appointments' : 'Contact'} CSV`}
          </button>
          <button
            onClick={() => exportData('xlsx')}
            disabled={exporting || currentSubmissions.length === 0}
            className="btn btn-outline disabled:opacity-50"
          >
            {exporting
              ? 'Exporting...'
              : `Export ${activeTab === 'appointments' ? 'Appointments' : 'Contact'} Excel`}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'appointments'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'contact'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact ({contact.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-500">Loading submissions...</div>
          </div>
        ) : currentSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg">No {activeTab} submissions yet.</div>
            <div className="text-slate-400 mt-2">
              Submissions will appear here when forms are submitted.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentSubmissions.map((submission) => (
              <div key={submission.id} className="card card-3d">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{submission.fullName}</h3>
                    <p className="text-slate-600">{submission.email}</p>
                    {submission.phone && (
                      <p className="text-slate-600">Phone: {submission.phone}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSubmission(activeTab, submission.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>

                {submission.preferredDateTime && (
                  <div className="mb-2">
                    <strong>Preferred Date & Time:</strong>{' '}
                    {new Date(submission.preferredDateTime).toLocaleString()}
                  </div>
                )}

                {submission.department && (
                  <div className="mb-2">
                    <strong>Department:</strong> {submission.department}
                  </div>
                )}

                {submission.message && (
                  <div className="mb-2">
                    <strong>Message:</strong>
                    <p className="mt-1 text-slate-700">{submission.message}</p>
                  </div>
                )}

                <div className="text-sm text-slate-500 mt-4">
                  Submitted: {new Date(submission.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={fetchSubmissions} className="btn btn-outline" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </section>
  );
}
