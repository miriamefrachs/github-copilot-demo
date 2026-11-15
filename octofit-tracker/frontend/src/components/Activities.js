import React from 'react';
import { useEndpoint } from '../api';
import DataTable from './DataTable';

function Activities() {
  const { items, loading, error, reload } = useEndpoint('activity');
  const { items: users } = useEndpoint('users');
  const userName = (id) => (users.find((user) => user._id === id) || {}).name || id;

  return (
    <DataTable
      title="Activities"
      loading={loading}
      error={error}
      onRefresh={reload}
      rows={items}
      columns={[
        { header: 'User', render: (a) => userName(a.user_id) },
        { header: 'Activity', render: (a) => a.type },
        { header: 'Duration (min)', render: (a) => a.duration },
        { header: 'Date', render: (a) => new Date(a.date).toLocaleDateString() },
      ]}
    />
  );
}

export default Activities;
