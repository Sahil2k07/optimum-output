const Roles = {
  CUSTOMER: "CUSTOMER",
  WHOLESELLER: "WHOLESELLER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export default Roles;
