export const UserRole = {
  Operador: "operador",
  Administrador: "administrador",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ResourceType = {
  Hidrante: "hidrante",
  Espejo: "espejo",
  Tanque: "tanque",
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

export const ResourceStatus = {
  Operativo: "operativo",
  Observaciones: "observaciones",
  NoUtilizable: "no_utilizable",
} as const;

export type ResourceStatus =
  (typeof ResourceStatus)[keyof typeof ResourceStatus];

export const IncidentType = {
  Dano: "dano",
  Obstruccion: "obstruccion",
  DatosIncorrectos: "datos_incorrectos",
  Otro: "otro",
} as const;

export type IncidentType = (typeof IncidentType)[keyof typeof IncidentType];

export const IncidentStatus = {
  Pendiente: "pendiente",
  Aprobada: "aprobada",
  Rechazada: "rechazada",
} as const;

export type IncidentStatus =
  (typeof IncidentStatus)[keyof typeof IncidentStatus];

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  institution: string;
  role: UserRole;
};

export type ResourceMapItem = {
  id: string;
  type: ResourceType;
  name: string;
  address: string;
  status: ResourceStatus;
  accessibility: string | null;
  capacity: string | null;
  observations: string | null;
  last_verified_at: string | null;
  last_verified_by_id: string | null;
  lat: number;
  lng: number;
};

export type ResourceDetail = ResourceMapItem & {
  verifier_name: string | null;
};

export type ResourceHistoryItem = {
  id: string;
  action: string;
  payload: Record<string, unknown>;
  created_at: string;
  user_name: string | null;
};

export type ResourceIncidentItem = {
  id: string;
  type: IncidentType;
  description: string;
  suggested_status: ResourceStatus | null;
  status: IncidentStatus;
  created_at: string;
  reporter_name: string | null;
};

export type ProfileAdmin = {
  id: string;
  email: string;
  name: string;
  institution: string;
  app_role: UserRole;
  active: boolean;
  created_at: string;
};
