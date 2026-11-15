import { useCallback, useEffect, useState } from 'react';

// Django REST Framework backend served through the Codespace (https, port 8000)
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'https://effective-guacamole-rpjx4794xr62xjqp-8000.app.github.dev/api';

// DRF returns a plain array, or { results: [] } when pagination is enabled
const toList = (data) => (Array.isArray(data) ? data : data.results || []);

export function useEndpoint(name) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    const url = `${API_BASE_URL}/${name}/`;
    console.log(`Fetching ${name} from`, url);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log(`Fetched ${name}:`, data);
        setItems(toList(data));
      })
      .catch((err) => {
        console.error(`Error fetching ${name}:`, err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [name]);

  useEffect(load, [load]);

  return { items, loading, error, reload: load };
}
