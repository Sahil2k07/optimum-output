import Permissions, { type Permission } from "./permissions";
import Roles, { type Role } from "./roles";

const RoleMatrix: Record<Role, readonly Permission[]> = {
  [Roles.CUSTOMER]: [],
  [Roles.WHOLESELLER]: [Permissions.MANAGE_PRODUCTS],
  [Roles.ADMIN]: [Permissions.MANAGE_PRODUCTS],
} as const;

export default RoleMatrix;
