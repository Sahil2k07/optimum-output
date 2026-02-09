import Roles from "../consts/role.js";

export type User = {
  id: number;
  email: string;
  name: string;
  role: Roles;
};
