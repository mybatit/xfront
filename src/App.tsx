import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Error404 from './pages/Authentication/Error404';
import UtilisateursPage from './pages/utilisateurs/UtilisateursPage';
import RootLayout from './routes/RootLayout';
import SynthesePage from './pages/SynthesePage';
import ComptesPage from './pages/comptes/ComptesPage';
import RolesPage from './pages/roles/RolesPage';
import PriviligesPage from './pages/priviliges/PriviligesPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<SynthesePage />} />
          <Route path="/utilisateurs" element={<UtilisateursPage />} />
          <Route path="/comptes" element={<ComptesPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/priviliges" element={<PriviligesPage />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App