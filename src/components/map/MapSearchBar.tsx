import type { FormEvent, KeyboardEvent } from "react";

type Props = {
  query: string;
  searching: boolean;
  resultCount?: number;
  loading?: boolean;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

export function MapSearchBar({
  query,
  searching,
  resultCount,
  loading,
  onQueryChange,
  onSearch,
  onClear,
}: Props) {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    onSearch();
  }

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();
    }
  }

  const count =
    loading || searching
      ? "Cargando…"
      : resultCount === undefined
        ? ""
        : `${resultCount} recursos`;

  return (
    <form className="map-search" role="search" onSubmit={onSubmit}>
      <label className="map-search-label">
        <span className="visually-hidden">Dirección</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={onKey}
          placeholder="Dirección o intersección"
          autoComplete="street-address"
          enterKeyHint="search"
          disabled={searching}
        />
      </label>
      <button
        type="submit"
        className="map-icon-btn map-search-btn"
        aria-label="Buscar"
        title="Buscar"
        disabled={searching}
      >
        <SearchIcon />
        <span>Buscar</span>
      </button>
      {query ? (
        <button
          type="button"
          className="map-icon-btn map-search-btn"
          aria-label="Borrar búsqueda"
          title="Borrar"
          onClick={onClear}
        >
          <ClearIcon />
          <span>Borrar</span>
        </button>
      ) : null}
      {count ? <span className="map-search-count">{count}</span> : null}
    </form>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
