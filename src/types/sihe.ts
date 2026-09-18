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
  lat: number;
  lng: number;
};
