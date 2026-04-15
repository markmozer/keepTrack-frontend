import { NavLink } from "react-router-dom";

export function SideNav({ title, items }) {
  return (
    <div className="side-nav">
      <div className="side-nav__title">{title}</div>

      <nav className="side-nav__menu">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              isActive ? "side-nav__link side-nav__link--active" : "side-nav__link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}