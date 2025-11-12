import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './shared/providers/ThemeProvider';
import AxiosInterceptorProvider from './shared/providers/AxiosInterceptorProvider';
import AuthProvider from './contexts/AuthContext';
import AppRouting from './routing/AppRouting';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position='bottom' buttonPosition='top-right' />
      <AxiosInterceptorProvider />
      <ThemeProvider>
        <AuthProvider>
          <AppRouting />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
