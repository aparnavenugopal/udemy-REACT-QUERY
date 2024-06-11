import { Posts } from "./Posts";
import "./App.css";
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );  
}

export default App;
