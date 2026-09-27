import type { IncidentType, ResourceStatus } from "@/types/sihe";



export function incidentTypeLabel(type: IncidentType): string {

  switch (type) {

    case "dano":

      return "Daño";

    case "obstruccion":

      return "Obstrucción";

    case "datos_incorrectos":

      return "Datos incorrectos";

    case "otro":

      return "Otro";

    default:

      return type;

  }

}



export function incidentStatusLabel(status: string): string {

  switch (status) {

    case "pendiente":

      return "Pendiente";

    case "aprobada":

      return "Aprobada";

    case "rechazada":

      return "Rechazada";

    default:

      return status;

  }

}



export function historyActionLabel(action: string): string {

  switch (action) {

    case "actualizacion_ficha":

      return "Actualización de ficha";

    case "incidencia_reportada":

      return "Incidencia reportada";

    case "incidencia_aprobada":

      return "Incidencia aprobada";

    case "incidencia_rechazada":

      return "Incidencia rechazada";

    case "alta_recurso":

      return "Alta de recurso";

    default:

      return action;

  }

}



export function formatDateTime(value: string | null | undefined): string {

  if (!value) return "Sin registro";

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) return value;

  return d.toLocaleString("es-AR", {

    dateStyle: "short",

    timeStyle: "short",

  });

}



export const RESOURCE_STATUS_OPTIONS: {

  value: ResourceStatus;

  label: string;

}[] = [

  { value: "operativo", label: "Operativo" },

  { value: "observaciones", label: "Observaciones" },

  { value: "no_utilizable", label: "No utilizable" },

];



export const INCIDENT_TYPE_OPTIONS: { value: IncidentType; label: string }[] =

  [

    { value: "dano", label: "Daño" },

    { value: "obstruccion", label: "Obstrucción" },

    { value: "datos_incorrectos", label: "Datos incorrectos" },

    { value: "otro", label: "Otro" },

  ];


