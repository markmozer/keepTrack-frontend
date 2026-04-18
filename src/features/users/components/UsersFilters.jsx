// src/features/users/components/UsersFilters.jsx

import { Input } from "../../../shared/components/Input";

export function UsersFilters({
  email,
  status,
  onEmailChange,
  onStatusChange,
}) {
  return (
    <>
      <Input
        label="Email"
        name="email"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder="Zoek op email"
      />

      <div className="form-field">
        <label className="form-label" htmlFor="status">
          Status
        </label>

        <select
          id="status"
          name="status"
          className="form-select"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">Alle statussen</option>
          <option value="NEW">NEW</option>
          <option value="INVITED">INVITED</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>
    </>
  );
}