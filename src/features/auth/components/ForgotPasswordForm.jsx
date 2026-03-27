import { useState } from "react";
import { forgotPassword } from "../api/auth.api";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { FormError } from "../../../shared/components/FormError";
import { getErrorMessage } from "../../../shared/utils/errors";

export function ForgotPasswordForm() {
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const result = await forgotPassword({
        email: form.email,
      });

      setSuccessMessage(
        result?.payload?.message ||
          "Als dit email adres bestaat, ontvangt u een email met een password reset link.",
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div className="auth-success">
        <p>{successMessage}</p>
        <p>Controleer ook je spam- of ongewenste e-mailmap.</p>
      </div>
    );
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

      <FormError message={error} />

      <Button type="submit" disabled={isSubmitting || !form.email.trim()}>
        {isSubmitting ? "Bezig..." : "Aanvragen"}
      </Button>
    </form>
  );
}