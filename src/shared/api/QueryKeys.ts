const QUERY_KEYS = {
  AUTH: {
    LOGIN: 'useLogin',
    REFRESH: 'useRefreshToken',
    LOGOUT: 'useLogout',
  },
  USER: {
    ME: 'useMe',
  },
} as const;

export default QUERY_KEYS;