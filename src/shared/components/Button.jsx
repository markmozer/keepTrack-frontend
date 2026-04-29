export function Button({
  as: Component = "button",
  type = "button",
  className = "",
  children,
  ...props
}) {
  const classes = className ? `button ${className}` : "button";

  if (Component !== "button") {
    return (
      <Component className={classes} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
