import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from './pages/Home/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './shared/providers/ThemeProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
