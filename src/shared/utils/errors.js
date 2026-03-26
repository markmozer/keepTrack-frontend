export function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Er ging iets mis.";
}
