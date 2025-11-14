const API_ROOT = (import.meta.env.VITE_API_ROOT || '').replace(/\/$/, '');

function normalizePath(path: string) {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;
}

export function buildApiUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = normalizePath(path);

  if (!API_ROOT) {
    return normalizedPath;
  }

  return `${API_ROOT}${normalizedPath}`;
}
