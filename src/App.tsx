import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Error404 from './pages/Authentication/Error404';
import UtilisateursPage from './pages/utilisateurs/UtilisateursPage';
import RootLayout from './routes/RootLayout';
import SynthesePage from './pages/SynthesePage';
import ComptesPage from './pages/comptes/ComptesPage';
import RolesPage from './pages/roles/RolesPage';
import PriviligesPage from './pages/priviliges/PriviligesPage';
import VehiculesAvecReservations from './pages/vehicles/VehiculesAvecReservations';
import VehiculesPage from './pages/vehicles/Vehicules';
import ReservationsPage from './pages/reservations/Reservations';
import ReservationsCreatePage from './pages/reservations/ReservationsCreatePage';
import TypesDesReservationsPage from './pages/types des reservations/TypesDesReservationsPage';
import Formalirers from './pages/formalirers/Formalirers';
import CreateUtilisateursPage from './pages/utilisateurs/CreateUtilisateursPage';
import EtatsDesReservationsPage from './pages/etats des reservations/EtatsDesReservationsPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<SynthesePage />} />
          {/* Administrateur */}
          <Route path="/utilisateurs" element={<UtilisateursPage />} /> {/* 👍✨*/}
          <Route path="/utilisateurs/create" element={<CreateUtilisateursPage />} />
          <Route path="/comptes" element={<ComptesPage />} /> {/* 👍✨*/}
          <Route path="/roles" element={<RolesPage />} />{/* 👍✨*/}
          <Route path="/priviliges" element={<PriviligesPage />} />{/* 👍✨*/}
          {/* Paramètres */}
          <Route path="/formalirers" element={<Formalirers />} /> {/* 👍✨*/}
          <Route path="/types-des-reservations" element={<TypesDesReservationsPage />} /> {/* 👍✨*/}
          <Route path="/etats-des-reservations" element={<EtatsDesReservationsPage />} /> {/* 👍✨*/}
          {/* Affichage de la liste des statuts de réservation */} {/* */}
          <Route path="/reservations" element={<ReservationsPage />} />{/* 👍✨*/}


          <Route path="/vehicules" element={<VehiculesPage />} /> {/* 👍✨*/}
          <Route path="/vehicules-avec-reservations" element={<VehiculesAvecReservations />} />{/* 👍✨*/}
          <Route path="/reservations/create" element={<ReservationsCreatePage />} />
          {/* <Route path="/reservations" element={<ReservationsPage />} /> */}
        </Route>
        <Route path="/*" element={<Error404 />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App


// Affichage de la liste des utilisateurs  ✅
// Affichage de la liste des comptes  ✅
// Affichage de la liste des roles  ✅
// Affichage de la liste des priviliges  ✅
// Affichage de la liste des formalirers  ✅
// Affichage de la liste des types des reservations  ✅
// Affichage de la liste des etats des reservations  ✅
// Affichage de la liste des reservations ✅
// Affichage de la liste des vehicules ✅
// Affichage de la liste des vehicules avec reservations ✅