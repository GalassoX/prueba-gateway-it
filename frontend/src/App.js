import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './Components/404';
import Home from './Components/Home/Home';
import Owners from './Components/Owners/Owners';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/propietarios', element: <Owners /> },
    { path: '*', element: <NotFound /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
