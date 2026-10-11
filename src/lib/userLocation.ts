export type LatLng = {
  lat: number;
  lng: number;
};

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
};

export function locateErrorMessage(err?: { code?: number }): string {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return "Tu navegador no permite geolocalización.";
  }
  if (err?.code === 1) {
    return "Permiso de ubicación denegado. Activá la ubicación o elegí el origen a mano.";
  }
  return "No se pudo obtener tu ubicación.";
}

export function getBrowserLocation(): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(locateErrorMessage()));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        reject(new Error(locateErrorMessage(err)));
      },
      GEO_OPTIONS,
    );
  });
}

export function watchBrowserLocation(
  onPosition: (pos: LatLng) => void,
  onError?: (message: string) => void,
): number {
  if (!navigator.geolocation) {
    onError?.(locateErrorMessage());
    return 0;
  }

  return navigator.geolocation.watchPosition(
    (pos) => {
      onPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => {
      onError?.(locateErrorMessage(err));
    },
    { ...GEO_OPTIONS, maximumAge: 5_000 },
  );
}

export function distanceMeters(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6_371_000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
