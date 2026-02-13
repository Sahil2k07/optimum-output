const Permissions = {
  MANAGE_PRODUCTS: "add-and-update-products",
  MANAGE_ALL_PRODUCTS: "admins-gets-full-access",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

export default Permissions;
