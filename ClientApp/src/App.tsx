import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const location = useLocation();

  // Define the routes to exclude from MainLayout
  const excludedRoutes: string[] = ['/login', '/'];
  const isExcludedRoute = excludedRoutes.some(
    (route) => route.toLowerCase() === location.pathname.toLowerCase()
  );

  return (
    <div>
      {isExcludedRoute ? (
        // Only render AppRoutes for excluded routes (e.g., /login), without MainLayout
        <AppRoutes />
      ) : (
        // Render MainLayout for all other routes
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      )}
    </div>
  );
};

export default App;
