import React from 'react';
import { useEndpoint } from '../api';
import DataTable from './DataTable';

function Users() {
  const { items, loading, error, reload } = useEndpoint('users');
  const { items: teams } = useEndpoint('teams');
  const teamName = (id) => (teams.find((team) => team._id === id) || {}).name || '-';

  return (
    <DataTable
      title="Users"
      loading={loading}
      error={error}
      onRefresh={reload}
      rows={items}
      columns={[
        { header: 'Name', render: (u) => u.name },
        { header: 'Email', render: (u) => u.email },
        { header: 'Team', render: (u) => teamName(u.team_id) },
      ]}
    />
  );
}

export default Users;
