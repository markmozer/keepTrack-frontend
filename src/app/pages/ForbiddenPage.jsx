import { Link } from "react-router-dom";

export function ForbiddenPage() {
  return (
    <div className="status-page">
      <h1>403</h1>
      <p>Je hebt geen toegang tot deze pagina.</p>
      <Link to="/app">Terug naar dashboard</Link>
    </div>
  );
}