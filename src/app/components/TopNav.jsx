import { NavLink } from "react-router-dom";

export function TopNav({ items }) {
  return (
    <div className="top-nav">
      <div className="top-nav__brand">keepTrack</div>

      <nav className="top-nav__menu">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.to === "/app"}
            className={({ isActive }) =>
              isActive ? "top-nav__link top-nav__link--active" : "top-nav__link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}