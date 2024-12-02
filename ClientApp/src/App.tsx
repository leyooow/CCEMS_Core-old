import AppRoutes from './routes/AppRoutes';
import SideBar from './layouts/SideBar';

const App = () => {
  return (
    <div>
       <SideBar/>
      <AppRoutes />
    </div>
  );
};

export default App;
