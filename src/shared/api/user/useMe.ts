import { useQuery } from "@tanstack/react-query";
import type { User } from "../../interfaces/user/User";
import client from "../Client";
import QUERY_KEYS from "../QueryKeys";

export const useMe = () => {
  const me = async (): Promise<User> => {
    try {
      const response = await client.get<User>('/api/users/me', { withCredentials: true });
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Errore durante la verifica del login";
      throw new Error(message);
    }
  }

  return useQuery<User, Error>({
    queryKey: [QUERY_KEYS.USER.ME],
    queryFn: me,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}