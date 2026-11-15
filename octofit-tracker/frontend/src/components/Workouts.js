import React from 'react';
import { useEndpoint } from '../api';
import DataTable from './DataTable';

function Workouts() {
  const { items, loading, error, reload } = useEndpoint('workouts');

  return (
    <DataTable
      title="Workouts"
      loading={loading}
      error={error}
      onRefresh={reload}
      rows={items}
      columns={[
        { header: 'Name', render: (w) => w.name },
        { header: 'Description', render: (w) => w.description || '-' },
      ]}
    />
  );
}

export default Workouts;
