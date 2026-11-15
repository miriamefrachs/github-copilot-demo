import React, { useState } from 'react';

const HIDDEN_FIELDS = ['password'];

function DetailsModal({ title, record, onClose }) {
  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title} details</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <dl className="row mb-0">
                {Object.entries(record)
                  .filter(([key]) => !HIDDEN_FIELDS.includes(key))
                  .map(([key, value]) => (
                    <React.Fragment key={key}>
                      <dt className="col-sm-4">{key}</dt>
                      <dd className="col-sm-8 text-break">{String(value ?? '-')}</dd>
                    </React.Fragment>
                  ))}
              </dl>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

function DataTable({ title, columns, rows, loading, error, onRefresh }) {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const visibleRows = rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h3 mb-0">{title}</h2>
        <div className="d-flex gap-2">
          <form className="d-flex" role="search" onSubmit={(event) => event.preventDefault()}>
            <input
              className="form-control"
              type="search"
              placeholder={`Filter ${title.toLowerCase()}`}
              aria-label={`Filter ${title}`}
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </form>
          <button type="button" className="btn btn-primary" onClick={onRefresh} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>
      <div className="card-body">
        {loading && (
          <div className="d-flex align-items-center gap-2">
            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            <span>Loading...</span>
          </div>
        )}
        {error && <div className="alert alert-danger mb-0">Could not load data: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column.header}>{column.header}</th>
                  ))}
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row._id}>
                    {columns.map((column) => (
                      <td key={column.header}>{column.render(row)}</td>
                    ))}
                    <td className="text-end">
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelected(row)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleRows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center text-muted">No results</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selected && <DetailsModal title={title} record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default DataTable;
