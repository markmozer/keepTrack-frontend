// src/features/auth/components/ResetPasswordForm.jsx

import { useState } from "react";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

export function ResetPasswordForm({
  onSubmit,
  isSubmitting = false,
  submitError = "",
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!password || !confirmPassword) {
      setFormError("Vul beide wachtwoordvelden in.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Wachtwoorden komen niet overeen.");
      return;
    }

    await onSubmit({ password });
  }

  const errorMessage = formError || submitError;

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Nieuw wachtwoord</span>
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>Bevestig wachtwoord</span>
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Bezig..." : "Wachtwoord resetten"}
      </Button>
    </form>
  );
}