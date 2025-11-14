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
    UPLOAD: 'useRecordingUpload',
    LIST: 'useGetRecordingList',
    DETAIL: 'useGetRecordingDetail'
  }
} as const;

export default QUERY_KEYS;