import { useMutation } from "@tanstack/react-query";
import QUERY_KEYS from "../QueryKeys";
import client from "../Client";

export const useLogout = () => {
  const postLogout = async (): Promise<void> => {
    await client.post("/api/logout", {});
  }

  return useMutation({
    mutationFn: postLogout,
    mutationKey: [QUERY_KEYS.AUTH.LOGOUT]
  });
}