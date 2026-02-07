import type { Permission } from "@/consts/permissions";
import RoleMatrix from "@/consts/roleMatrix";
import axiosInstance from "@/lib/axios";
import type { User } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useAuth() {
  const token = localStorage.getItem("API_TOKEN");

  const { data: user } = useQuery<User | undefined>({
    queryKey: ["me", token],
    queryFn: async () => {
      if (!token) return undefined;

      const response = await axiosInstance.get<User>("/api/auth/me");

      return response.data;
    },
  });

  const hasAccess = (...permissions: Permission[]) => {
    if (!user) return false;

    const rolePermissions = RoleMatrix[user.role] ?? [];

    return permissions.every((permission) =>
      rolePermissions.includes(permission),
    );
  };

  return { user, hasAccess };
}

export default useAuth;
