/** Traduce errores técnicos o en inglés a mensajes claros en español. */
export function toUserMessage(err: unknown, fallback = "No se pudo completar la acción."): string {
  const raw =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : "";

  const text = raw.trim();
  if (!text) return fallback;

  const lower = text.toLowerCase();

  if (
    /invalid login credentials|invalid credentials|email.*password|wrong password|user not found/i.test(
      text,
    ) ||
    lower.includes("invalid_credentials")
  ) {
    return "Email o contraseña incorrectos";
  }

  if (
    /failed to fetch|networkerror|network request failed|load failed|err_network|econnrefused|enotfound|offline|timeout|timed out/i.test(
      text,
    )
  ) {
    return "Sin conexión. Revisá la red e intentá de nuevo.";
  }

  if (
    /permission denied|not authorized|unauthorized|forbidden|rls|row-level security|jwt expired|status code 403|status code 401/i.test(
      text,
    )
  ) {
    return "No tenés permiso para esta acción.";
  }

  if (/[A-Za-z]{3,}/.test(text) && !/[áéíóúñÁÉÍÓÚÑ¿¡]/.test(text)) {
    if (
      /\b(error|exception|undefined|null|stack|supabase|postgres|fetch|http)\b/i.test(
        text,
      )
    ) {
      return fallback;
    }
  }

  return text;
}
