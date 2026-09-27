import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import type { ResourceMapItem } from "@/types/sihe";

import { FilterPanel } from "@/components/resources/FilterPanel";

import { useResourceFilters } from "@/hooks/useResourceFilters";

import { filtersToSearchParams } from "@/lib/resourceFilters";

import { statusLabel, typeLabel } from "@/lib/resourceLabels";

import { fetchResourcesMap } from "@/services/resources";



const PAGE_SIZE = 25;



export function ResourceListPage() {

  const { filters, patchFilters, clearFilters } = useResourceFilters();

  const [items, setItems] = useState<ResourceMapItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);



  useEffect(() => {

    let cancelled = false;

    setLoading(true);

    setError(null);

    setPage(1);

    if (filters.type === "ninguno") {
      setItems([]);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    void fetchResourcesMap({

      type: filters.type || undefined,

      status: filters.status || undefined,

    })

      .then((data) => {

        if (!cancelled) setItems(data);

      })

      .catch((err: unknown) => {

        if (!cancelled) {

          setError(

            err instanceof Error ? err.message : "No se pudo cargar el listado",

          );

        }

      })

      .finally(() => {

        if (!cancelled) setLoading(false);

      });

    return () => {

      cancelled = true;

    };

  }, [filters.type, filters.status]);



  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);



  const pageItems = useMemo(() => {

    const start = (currentPage - 1) * PAGE_SIZE;

    return items.slice(start, start + PAGE_SIZE);

  }, [items, currentPage]);



  const from = items.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const to = Math.min(currentPage * PAGE_SIZE, items.length);



  const mapQuery = filtersToSearchParams(filters).toString();

  const mapHref = mapQuery ? `/mapa?${mapQuery}` : "/mapa";



  return (

    <div className="list-page">

      <div className="list-header">

        <div>

          <h1>Listado de recursos</h1>

          <p className="list-subtitle">

            Filtros por tipo y estado. Para buscar una calle, usá el mapa.

          </p>

        </div>

        <Link to={mapHref} className="btn-toolbar">

          Ver en mapa

        </Link>

      </div>



      <FilterPanel

        filters={filters}

        onChange={(partial) => {

          setPage(1);

          patchFilters(partial);

        }}

        onClear={() => {

          setPage(1);

          clearFilters();

        }}

        resultCount={items.length}

        loading={loading}

      />



      {error ? (

        <p className="map-error" role="alert">

          {error}

        </p>

      ) : null}



      <div className="list-table-wrap">

        <table className="list-table">

          <thead>

            <tr>

              <th>Nombre</th>

              <th>Tipo</th>

              <th>Estado</th>

              <th>Dirección</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {!loading && items.length === 0 ? (

              <tr>

                <td colSpan={5} className="list-empty">

                  No hay recursos con esos filtros.

                </td>

              </tr>

            ) : null}

            {pageItems.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{typeLabel(item.type)}</td>

                <td>

                  <span className={`status-pill status-${item.status}`}>

                    {statusLabel(item.status)}

                  </span>

                </td>

                <td>{item.address}</td>

                <td className="list-actions">

                  <Link to={`/recursos/${item.id}`} className="list-link">

                    Ficha

                  </Link>

                  <Link

                    to={`/mapa?focus=${item.id}&${filtersToSearchParams(filters).toString()}`}

                    className="list-link"

                  >

                    Mapa

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>



      {items.length > 0 ? (

        <div className="list-pagination">

          <button

            type="button"

            className="btn-toolbar"

            disabled={currentPage <= 1}

            onClick={() => setPage((p) => Math.max(1, p - 1))}

          >

            Anterior

          </button>

          <span className="list-pagination-info">

            {from}–{to} de {items.length} · Página {currentPage} / {totalPages}

          </span>

          <button

            type="button"

            className="btn-toolbar"

            disabled={currentPage >= totalPages}

            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}

          >

            Siguiente

          </button>

        </div>

      ) : null}

    </div>

  );

}


