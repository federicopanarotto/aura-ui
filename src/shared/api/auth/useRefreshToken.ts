import { useMutation } from '@tanstack/react-query';
import QUERY_KEYS from '../QueryKeys';
import client from '../Client';

const useRefreshToken = () => {
  const refreshToken = async () => {
    const response = await client.post('/api/refreshToken', {}, { withCredentials: true });
    return response.data;
  };

  return useMutation<unknown, any, void>({
    mutationFn: refreshToken,
    mutationKey: [QUERY_KEYS.AUTH.REFRESH],
  });
};

export default useRefreshToken;
