type DraftBag = Record<string, string | number | null>;

function keyFor(userId: string, form: string): string {
  return `sihe-draft:${userId}:${form}`;
}

export function loadFormDraft<T extends DraftBag>(
  userId: string | undefined,
  form: string,
): Partial<T> | null {
  if (!userId || typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(keyFor(userId, form));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as Partial<T>;
  } catch {
    return null;
  }
}

export function saveFormDraft(
  userId: string | undefined,
  form: string,
  data: DraftBag,
): void {
  if (!userId || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(keyFor(userId, form), JSON.stringify(data));
  } catch {
    // cupo lleno u origen privado: se ignora
  }
}

export function clearFormDraft(userId: string | undefined, form: string): void {
  if (!userId || typeof localStorage === "undefined") return;
  try {
    localStorage.removeItem(keyFor(userId, form));
  } catch {
    // se ignora: el borrador es opcional
  }
}
