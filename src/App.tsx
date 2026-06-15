import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './assets/routes';
import { Provider } from 'react-redux';
import { myStore } from './redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={myStore}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
