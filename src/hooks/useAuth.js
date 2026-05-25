// En FrontEnd/src/hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import { UsersApi } from "../api/users.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UsersApi.getMe(),
  });
};