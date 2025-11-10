import { useEffect } from 'react';
import useRefreshToken from '../api/auth/useRefreshToken';
import { setupAxiosInterceptors } from '../api/Client';

function AxiosInterceptorProvider() {

  const { mutateAsync: refreshToken } = useRefreshToken();

  const refreshTokenWrapper = async () => {
    await refreshToken();
    return;
  };

  useEffect(() => {
    setupAxiosInterceptors(refreshTokenWrapper);
  }, [refreshToken]);

  return null;
};

export default AxiosInterceptorProvider;