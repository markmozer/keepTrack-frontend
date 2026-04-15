// src/shared/components/Field.jsx

export function Field({ label, value }) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="value">{value ?? "-"}</div>
    </div>
  );
}