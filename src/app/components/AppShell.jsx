export function AppShell({ topNav, sideNav, children }) {
  return (
    <div className="app-shell">
      <header className="app-shell__top">{topNav}</header>

      <div className="app-shell__body">
        <aside className="app-shell__side">{sideNav}</aside>
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  );
}