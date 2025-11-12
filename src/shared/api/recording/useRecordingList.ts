import { useQuery } from "@tanstack/react-query";
import type { Recording } from "../../interfaces/recording/Recording";
import client from "../Client";
import QUERY_KEYS from "../QueryKeys";

const useRecordingList = () => {
  const getRecordingList = async (): Promise<Recording[]> => {
    try {
      const response = await client.get<Recording[]>(`/api/recordings`);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error";
      throw new Error(message);
    }
  }

  return useQuery<Recording[], Error>({
    queryKey: [QUERY_KEYS.RECORDING.LIST],
    queryFn: getRecordingList,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
  });
}

export default useRecordingList;