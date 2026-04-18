// src/shared/components/DataTable.jsx

export function DataTable({
  columns,
  rows,
  keyField = "id",
  emptyMessage = "Geen gegevens beschikbaar.",
}) {
  if (!rows || rows.length === 0) {
    return (
      <div className="data-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}