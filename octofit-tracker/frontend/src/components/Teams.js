import React from 'react';
import { useEndpoint } from '../api';
import DataTable from './DataTable';

function Teams() {
  const { items, loading, error, reload } = useEndpoint('teams');

  return (
    <DataTable
      title="Teams"
      loading={loading}
      error={error}
      onRefresh={reload}
      rows={items}
      columns={[
        { header: 'Name', render: (t) => t.name },
        { header: 'Description', render: (t) => t.description || '-' },
      ]}
    />
  );
}

export default Teams;
