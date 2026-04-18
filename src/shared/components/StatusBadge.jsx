// src/shared/components/StatusBadge.jsx

export function StatusBadge({ children, variant = "neutral" }) {
  return (
    <span className={`status-badge status-badge--${variant}`}>{children}</span>
  );
}