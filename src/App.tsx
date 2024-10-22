import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TypesDesReservationsCreatePage from "./pages/types des reservations/TypesDesReservationsCreatePage";

// Utilisation de React.lazy pour charger les composants dynamiquement
const Login = lazy(() => import("./pages/Authentication/Login"));
const Error404 = lazy(() => import("./pages/Authentication/Error404"));
const UtilisateursPage = lazy(
  () => import("./pages/utilisateurs/UtilisateursPage")
);
const RootLayout = lazy(() => import("./routes/RootLayout"));
const SynthesePage = lazy(() => import("./pages/SynthesePage"));
const ComptesPage = lazy(() => import("./pages/comptes/ComptesPage"));
const RolesPage = lazy(() => import("./pages/roles/RolesPage"));
const PriviligesPage = lazy(() => import("./pages/priviliges/PriviligesPage"));
const VehiculesAvecReservations = lazy(
  () => import("./pages/vehicles/VehiculesAvecReservations")
);
const VehiculesPage = lazy(() => import("./pages/vehicles/Vehicules"));
const ReservationsPage = lazy(
  () => import("./pages/reservations/Reservations")
);
const ReservationsCreatePage = lazy(
  () => import("./pages/reservations/ReservationsCreatePage")
);
const TypesDesReservationsPage = lazy(
  () => import("./pages/types des reservations/TypesDesReservationsPage")
);
const Formalirers = lazy(() => import("./pages/formalirers/Formalirers"));
const CreateUtilisateursPage = lazy(
  () => import("./pages/utilisateurs/CreateUtilisateursPage")
);
const EtatsDesReservationsPage = lazy(
  () => import("./pages/etats des reservations/EtatsDesReservationsPage")
);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Suspense devrait envelopper des composants spécifiques ici */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Chargement...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Chargement...</div>}>
              <RootLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <SynthesePage />
              </Suspense>
            }
          />
          {/* Administrateur */}
          <Route
            path="/utilisateurs"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <UtilisateursPage />
              </Suspense>
            }
          />
          <Route
            path="/utilisateurs/create"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <CreateUtilisateursPage />
              </Suspense>
            }
          />
          <Route
            path="/comptes"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <ComptesPage />
              </Suspense>
            }
          />
          <Route
            path="/roles"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <RolesPage />
              </Suspense>
            }
          />
          <Route
            path="/priviliges"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <PriviligesPage />
              </Suspense>
            }
          />
          {/* Paramètres */}
          <Route
            path="/formalirers"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <Formalirers />
              </Suspense>
            }
          />
          <Route
            path="/types-des-reservations"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <TypesDesReservationsPage />
              </Suspense>
            }
          />
          <Route
            path="/types-des-reservations/create"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <TypesDesReservationsCreatePage />
              </Suspense>
            }
          />
          <Route
            path="/etats-des-reservations"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <EtatsDesReservationsPage />
              </Suspense>
            }
          />
          {/* Réservations */}
          <Route
            path="/reservations"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <ReservationsPage />
              </Suspense>
            }
          />
          <Route
            path="/reservations/create"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <ReservationsCreatePage />
              </Suspense>
            }
          />
          {/* Véhicules */}
          <Route
            path="/vehicules"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <VehiculesPage />
              </Suspense>
            }
          />
          <Route
            path="/vehicules-avec-reservations"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <VehiculesAvecReservations />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/*"
          element={
            <Suspense fallback={<div>Chargement...</div>}>
              <Error404 />
            </Suspense>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

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
