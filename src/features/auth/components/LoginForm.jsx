import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { FormError } from "../../../shared/components/FormError";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email: form.email,
        password: form.password,
      });

      await refresh();
      navigate("/app", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>E-mail</span>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form-field">
        <span>Wachtwoord</span>
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <FormError message={error} />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Bezig..." : "Inloggen"}
      </Button>

      <p className="auth-form__footer">
        <Link to="/forgot-password">Wachtwoord vergeten?</Link>
      </p>
    </form>
  );
}