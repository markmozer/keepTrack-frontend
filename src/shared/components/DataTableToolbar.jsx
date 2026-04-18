// src/shared/components/DataTableToolbar.jsx

export function DataTableToolbar({ filters, actions }) {
  return (
    <div className="data-table-toolbar">
      <div className="data-table-toolbar__filters">{filters}</div>
      <div className="data-table-toolbar__actions">{actions}</div>
    </div>
  );
}