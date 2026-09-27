import { useState, type FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";

import {

  MapContainer,

  Marker,

  TileLayer,

  useMapEvents,

} from "react-leaflet";

import L from "leaflet";

import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";

import { RESOURCE_STATUS_OPTIONS } from "@/lib/incidentLabels";
import { createResourceAdmin } from "@/services/admin";
import { formatMapCoords, reverseGeocodeCity } from "@/services/geocode";
import type { ResourceStatus, ResourceType } from "@/types/sihe";



const pinIcon = L.divIcon({

  className: "address-marker",

  html: '<span class="address-marker-dot"></span>',

  iconSize: [18, 18],

  iconAnchor: [9, 9],

});



function ClickPicker({

  onPick,

}: {

  onPick: (lat: number, lng: number) => void;

}) {

  useMapEvents({

    click(e) {

      onPick(e.latlng.lat, e.latlng.lng);

    },

  });

  return null;

}



export function AdminCreateResourcePage() {

  const navigate = useNavigate();

  const [type, setType] = useState<ResourceType>("hidrante");

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const [accessibility, setAccessibility] = useState("");

  const [capacity, setCapacity] = useState("");

  const [status, setStatus] = useState<ResourceStatus>("operativo");

  const [observations, setObservations] = useState("");

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [resolvingAddress, setResolvingAddress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMapPick(pickLat: number, pickLng: number) {
    setLat(pickLat);
    setLng(pickLng);
    setAddress(formatMapCoords(pickLat, pickLng));
    setResolvingAddress(true);
    setError(null);
    try {
      const resolved = await reverseGeocodeCity(pickLat, pickLng);
      setAddress(resolved);
    } finally {
      setResolvingAddress(false);
    }
  }



  async function onSubmit(e: FormEvent) {

    e.preventDefault();

    if (lat == null || lng == null) {

      setError("Marcá la ubicación en el mapa.");

      return;

    }

    setSaving(true);

    setError(null);

    try {

      const id = await createResourceAdmin({

        type,

        name,

        address,

        lat,

        lng,

        accessibility,

        capacity,

        status,

        observations,

      });

      navigate(`/recursos/${id}`);

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo crear");

    } finally {

      setSaving(false);

    }

  }



  return (

    <div className="admin-page admin-create">

      <div className="list-header" style={{ paddingLeft: 0, paddingRight: 0 }}>

        <div>

          <h1>Alta de recurso</h1>

          <p className="list-subtitle">

            Completá los datos y hacé clic en el mapa: la dirección se completa
            con la calle del punto o, si no hay, con las coordenadas.

          </p>

        </div>

        <Link to="/admin" className="btn-toolbar">

          Cancelar

        </Link>

      </div>



      <form className="form-card" onSubmit={(e) => void onSubmit(e)}>

        <div className="form-row">

          <label className="field">

            <span>Tipo</span>

            <select

              value={type}

              onChange={(e) => setType(e.target.value as ResourceType)}

            >

              <option value="hidrante">Hidrante</option>

              <option value="espejo">Espejo de agua</option>

              <option value="tanque">Tanque</option>

            </select>

          </label>

          <label className="field">

            <span>Estado</span>

            <select

              value={status}

              onChange={(e) => setStatus(e.target.value as ResourceStatus)}

            >

              {RESOURCE_STATUS_OPTIONS.map((o) => (

                <option key={o.value} value={o.value}>

                  {o.label}

                </option>

              ))}

            </select>

          </label>

        </div>



        <label className="field">

          <span>Nombre / referencia</span>

          <input

            value={name}

            onChange={(e) => setName(e.target.value)}

            required

          />

        </label>



        <label className="field">
          <span>Dirección</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Se completa al marcar en el mapa"
          />
        </label>



        <div className="form-row">

          <label className="field">

            <span>Accesibilidad</span>

            <input

              value={accessibility}

              onChange={(e) => setAccessibility(e.target.value)}

            />

          </label>

          <label className="field">

            <span>Capacidad / caudal</span>

            <input

              value={capacity}

              onChange={(e) => setCapacity(e.target.value)}

            />

          </label>

        </div>



        <label className="field">

          <span>Observaciones</span>

          <textarea

            rows={3}

            value={observations}

            onChange={(e) => setObservations(e.target.value)}

          />

        </label>



        <p className="form-hint">
          Ubicación:{" "}
          {lat != null && lng != null
            ? resolvingAddress
              ? `${formatMapCoords(lat, lng)} · buscando calle…`
              : formatMapCoords(lat, lng)
            : "hacé clic en el mapa"}
        </p>



        <div className="create-map">

          <MapContainer

            center={[CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng]}

            zoom={MAP_DEFAULT_ZOOM}

            className="create-map-canvas"

            scrollWheelZoom

          >

            <TileLayer

              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            <ClickPicker
              onPick={(pickLat, pickLng) => {
                void handleMapPick(pickLat, pickLng);
              }}
            />

            {lat != null && lng != null ? (

              <Marker position={[lat, lng]} icon={pinIcon} />

            ) : null}

          </MapContainer>

        </div>



        {error ? (

          <p className="form-error" role="alert">

            {error}

          </p>

        ) : null}



        <div className="form-actions">

          <button

            type="submit"

            className="btn-primary btn-inline"

            disabled={saving}

          >

            {saving ? "Guardando…" : "Guardar recurso"}

          </button>

        </div>

      </form>

    </div>

  );

}


