import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="status-page">
      <h1>404</h1>
      <p>Deze pagina bestaat niet.</p>
      <Link to="/app">Terug naar dashboard</Link>
    </div>
  );
}