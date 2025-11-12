const QUERY_KEYS = {
  AUTH: {
    LOGIN: 'useLogin',
    REFRESH: 'useRefreshToken',
    LOGOUT: 'useLogout',
  },
  USER: {
    ME: 'useMe',
  },
  RECORDING: {
    UPLOAD: 'useRecordingUpload'
  }
} as const;

export default QUERY_KEYS;