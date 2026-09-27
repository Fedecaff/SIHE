import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { countPendingIncidents } from "@/services/resources";



export function AdminPage() {

  const [pending, setPending] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    let cancelled = false;

    void countPendingIncidents()

      .then((n) => {

        if (!cancelled) setPending(n);

      })

      .catch((err: unknown) => {

        if (!cancelled) {

          setError(err instanceof Error ? err.message : "Error al cargar");

        }

      });

    return () => {

      cancelled = true;

    };

  }, []);



  return (

    <div className="admin-page">

      <h1>Panel administrador</h1>

      <p className="admin-lead">

        Gestión de usuarios, incidencias, recursos e incendios.

      </p>



      {error ? (

        <p className="form-error" role="alert">

          {error}

        </p>

      ) : null}



      <div className="admin-grid">

        <Link to="/admin/usuarios" className="admin-card">

          <h2>Usuarios</h2>

          <p>Crear, editar rol y activar / desactivar cuentas.</p>

        </Link>



        <Link to="/admin/incidencias" className="admin-card">

          <h2>Incidencias pendientes</h2>

          <p className="admin-stat">{pending === null ? "…" : pending}</p>

          <p>Revisar, aplicar a la ficha o rechazar.</p>

        </Link>



        <Link to="/admin/recursos/nuevo" className="admin-card">

          <h2>Alta de recurso</h2>

          <p>Registrar un punto nuevo marcando en el mapa.</p>

        </Link>

        <Link to="/admin/incendios/nuevo" className="admin-card">

          <h2>Registrar incendio</h2>

          <p>Cargar el evento al volver de la intervención.</p>

        </Link>



        <Link to="/mapa" className="admin-card">

          <h2>Mapa</h2>

          <p>Volver a la consulta territorial.</p>

        </Link>

      </div>

    </div>

  );

}


