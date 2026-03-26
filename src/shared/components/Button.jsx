export function Button({ type = "button", children, ...props }) {
  return (
    <button className="button" type={type} {...props}>
      {children}
    </button>
  );
}