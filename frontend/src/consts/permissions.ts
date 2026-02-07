const Permissions = {
  MANAGE_PRODUCTS: "add-and-update-products",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

export default Permissions;
