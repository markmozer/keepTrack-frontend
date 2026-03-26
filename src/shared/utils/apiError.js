export function getApiErrorMessage(result, fallback = "Er ging iets mis.") {
  if (!result) return fallback;

  const message = result?.error?.message;

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (message && typeof message === "object") {
    const values = Object.values(message).filter(Boolean);
    if (values.length > 0) {
      return values.join(", ");
    }
  }

  if (typeof result?.error?.code === "string" && result.error.code.trim()) {
    return result.error.code;
  }

  return fallback;
}