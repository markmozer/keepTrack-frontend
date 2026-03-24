import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

export function ForgotPasswordForm() {
  return (
    <form className="auth-form">
      <label className="form-field">
        <span>E-mail</span>
        <Input name="email" type="email" autoComplete="email" />
      </label>

      <Button type="submit">Reset-link versturen</Button>
    </form>
  );
}