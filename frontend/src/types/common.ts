import type { Permission } from "@/consts/permissions";
import type { Role } from "@/consts/roles";

export type User = {
  id: number;
  email: string;
  role: Role;
  name: string;
};

export type AuthContext = {
  user?: User;
  hasAccess: (...permissaions: Permission[]) => boolean;
};
