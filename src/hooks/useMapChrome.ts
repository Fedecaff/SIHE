import { useEffect, useState } from "react";
import {
  mapChromeFromMedia,
  MQ_DESKTOP,
  MQ_LANDSCAPE_SHORT,
  MQ_TABLET,
  MQ_WIDE,
  type MapChrome,
} from "@/lib/breakpoints";

function readChrome(): { chrome: MapChrome; wide: boolean; zoom: boolean } {
  const landscapeShort = window.matchMedia(MQ_LANDSCAPE_SHORT).matches;
  const desktop = window.matchMedia(MQ_DESKTOP).matches;
  const wide = window.matchMedia(MQ_WIDE).matches;
  const zoom = window.matchMedia(MQ_TABLET).matches;
  return {
    chrome: mapChromeFromMedia({ landscapeShort, desktop }),
    wide,
    zoom,
  };
}

export function useMapChrome() {
  const [value, setValue] = useState(readChrome);

  useEffect(() => {
    const queries = [MQ_LANDSCAPE_SHORT, MQ_DESKTOP, MQ_WIDE, MQ_TABLET].map(
      (query) => window.matchMedia(query),
    );
    const update = () => setValue(readChrome());
    for (const query of queries) query.addEventListener("change", update);
    return () => {
      for (const query of queries) query.removeEventListener("change", update);
    };
  }, []);

  return value;
}
