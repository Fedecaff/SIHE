/** Móvil < 768, tablet 768–1023, escritorio ≥ 1024.
 *  Apaisado bajo gana aunque el ancho sea ≥ 768.
 */
export const MQ_TABLET = "(min-width: 768px)";
export const MQ_DESKTOP = "(min-width: 1024px)";
export const MQ_WIDE = "(min-width: 1280px)";
export const MQ_LANDSCAPE_SHORT =
  "(orientation: landscape) and (max-height: 500px)";

export type MapChrome = "compact" | "landscape" | "desktop";

export function mapChromeFromMedia(flags: {
  landscapeShort: boolean;
  desktop: boolean;
}): MapChrome {
  if (flags.landscapeShort) return "landscape";
  if (flags.desktop) return "desktop";
  return "compact";
}
