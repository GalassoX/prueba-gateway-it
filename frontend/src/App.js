import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import NotFound from './Components/404';
import Home from './Components/Home/Home';
import OwnerInfo from './Components/Owners/OwnerInfo/OwnerInfo';
import Owners from './Components/Owners/Owners';
import VehicleInfo from './Components/Vehicles/VehicleInfo/VehicleInfo';
import Vehicles from './Components/Vehicles/Vehicles';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/propietarios', element: <Owners /> },
    { path: '/propietarios/:id', element: <OwnerInfo /> },
    { path: '/vehiculos', element: <Vehicles /> },
    { path: '/vehiculos/:id', element: <VehicleInfo />, },
    { path: '/auth', element: <Auth /> },
    { path: '/cerrar', element: <Logout /> },
    { path: '*', element: <NotFound /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
