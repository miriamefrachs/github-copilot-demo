import React from 'react';
import { useEndpoint } from '../api';
import DataTable from './DataTable';

function Leaderboard() {
  const { items, loading, error, reload } = useEndpoint('leaderboard');
  const { items: users } = useEndpoint('users');
  const userName = (id) => (users.find((user) => user._id === id) || {}).name || id;
  const ranked = [...items].sort((a, b) => b.points - a.points);

  return (
    <DataTable
      title="Leaderboard"
      loading={loading}
      error={error}
      onRefresh={reload}
      rows={ranked}
      columns={[
        { header: 'Rank', render: (e) => ranked.indexOf(e) + 1 },
        { header: 'Username', render: (e) => userName(e.user_id) },
        { header: 'Points', render: (e) => e.points },
      ]}
    />
  );
}

export default Leaderboard;
