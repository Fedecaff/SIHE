import { useEffect, useState } from "react";
import { FIRMS_REFRESH_MS, OVERLAY_FIRMS } from "@/lib/mapConstants";
import { yesterdayInArgentina } from "@/lib/fireDates";
import { loadMapLayerPrefs, saveMapLayerPrefs } from "@/lib/mapLayerPrefs";
import {
  firmsCountLabel,
  type FirmsConfidenceFilter,
  type FirmsHotspot,
  type FirmsSourceChoice,
  type FirmsWindow,
} from "@/lib/firmsHotspots";
import { fetchFirmsHotspots } from "@/services/firms";

export function useSatelliteLayers() {
  const [baseLayer, setBaseLayer] = useState(
    () => loadMapLayerPrefs().base,
  );
  const [overlays, setOverlays] = useState(
    () => loadMapLayerPrefs().overlays,
  );
  const [date, setDate] = useState(() => yesterdayInArgentina());
  const [windowMode, setWindowMode] = useState<FirmsWindow>("24h");
  const [source, setSource] = useState<FirmsSourceChoice>("VIIRS_SNPP_NRT");
  const [confidence, setConfidence] = useState<FirmsConfidenceFilter>("todas");
  const [minFrp, setMinFrp] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [hotspots, setHotspots] = useState<FirmsHotspot[]>([]);
  const [firmsError, setFirmsError] = useState<string | null>(null);
  const [tileWarning, setTileWarning] = useState<string | null>(null);

  const firmsOn = overlays.includes(OVERLAY_FIRMS);

  useEffect(() => {
    if (!firmsOn) return;
    let cancelled = false;
    let current: AbortController | null = null;

    async function load() {
      current?.abort();
      const controller = new AbortController();
      current = controller;
      const parsedFrp = minFrp.trim() === "" ? null : Number(minFrp);
      try {
        const rows = await fetchFirmsHotspots(
          {
            source,
            window: windowMode,
            date,
            confidence,
            minFrp:
              parsedFrp != null && Number.isFinite(parsedFrp) ? parsedFrp : null,
          },
          controller.signal,
        );
        if (!cancelled) {
          setHotspots(rows);
          setFirmsError(null);
        }
      } catch (err: unknown) {
        if (cancelled || controller.signal.aborted) return;
        if (!cancelled) {
          setHotspots([]);
          setFirmsError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar los focos satelitales.",
          );
        }
      }
    }

    void load();
    const timer =
      windowMode === "dia"
        ? null
        : setInterval(() => {
            void load();
          }, FIRMS_REFRESH_MS);

    return () => {
      cancelled = true;
      current?.abort();
      if (timer) clearInterval(timer);
    };
  }, [firmsOn, source, windowMode, date, confidence, minFrp]);

  function remember(nextBase: string, nextOverlays: string[]) {
    saveMapLayerPrefs({ base: nextBase, overlays: nextOverlays });
  }

  function changeBase(name: string) {
    setBaseLayer(name);
    remember(name, overlays);
  }

  function changeOverlay(name: string, enabled: boolean) {
    setOverlays((current) => {
      const next = enabled
        ? current.includes(name)
          ? current
          : [...current, name]
        : current.filter((item) => item !== name);
      remember(baseLayer, next);
      return next;
    });
    if (name === OVERLAY_FIRMS && !enabled) {
      setHotspots([]);
      setFirmsError(null);
    }
  }

  function reportTileError(name: string) {
    setTileWarning(
      `La capa ${name} no respondió. Si esa fecha no tiene imagen, puede quedar vacía.`,
    );
  }

  const firmsLabel = firmsOn
    ? firmsCountLabel(hotspots.length, windowMode, date)
    : null;

  return {
    baseLayer,
    overlays,
    date,
    windowMode,
    source,
    confidence,
    minFrp,
    opacity,
    hotspots,
    firmsError,
    firmsLabel,
    tileWarning,
    setDate,
    setWindowMode,
    setSource,
    setConfidence,
    setMinFrp,
    setOpacity,
    changeBase,
    changeOverlay,
    reportTileError,
  };
}
