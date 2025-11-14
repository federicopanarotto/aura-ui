import { useMutation } from '@tanstack/react-query';
import type { Login } from '../../interfaces/user/Login';
import type { User } from '../../interfaces/user/User';
import QUERY_KEYS from '../QueryKeys';
import client from '../Client';

const useLogin = () => {
  const login = async (credentials: Login): Promise<User> => {
      const response = await client.post<User>('/api/login', credentials);
      return response.data;
    }

  return useMutation<User, any, Login>({
    mutationFn: login,
    mutationKey: [QUERY_KEYS.AUTH.LOGIN],
    onError: (error) => {
      console.error('Login failed', error.response?.data?.message || error.message);
    },
  });
};

export default useLogin;