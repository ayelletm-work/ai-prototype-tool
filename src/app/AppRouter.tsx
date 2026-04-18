import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';

const router = createBrowserRouter(appRoutes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
