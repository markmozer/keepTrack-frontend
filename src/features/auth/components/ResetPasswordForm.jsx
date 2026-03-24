import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

export function ResetPasswordForm() {
  return (
    <form className="auth-form">
      <label className="form-field">
        <span>Nieuw wachtwoord</span>
        <Input name="password" type="password" autoComplete="new-password" />
      </label>

      <label className="form-field">
        <span>Bevestig wachtwoord</span>
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
      </label>

      <Button type="submit">Wachtwoord resetten</Button>
    </form>
  );
}