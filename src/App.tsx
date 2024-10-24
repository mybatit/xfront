import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TypesDesReservationsCreatePage from "./pages/types des reservations/TypesDesReservationsCreatePage";
import DetailsReservationPage from "./pages/reservations/DetailsReservationPage";
import Loader from "./components/ui/Elements/Loader";

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
const ReservationsPlanifierPage = lazy(
  () => import("./pages/reservations/ReservationsPlanifierPage")
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
            <Suspense fallback={
                  <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
            }>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={
                  <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
            }>
              <RootLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <SynthesePage />
              </Suspense>
            }
          />
          {/* Administrateur */}
          <Route
            path="/utilisateurs"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <UtilisateursPage />
              </Suspense>
            }
          />
          <Route
            path="/utilisateurs/create"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <CreateUtilisateursPage />
              </Suspense>
            }
          />
          <Route
            path="/comptes"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <ComptesPage />
              </Suspense>
            }
          />
          <Route
            path="/roles"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <RolesPage />
              </Suspense>
            }
          />
          <Route
            path="/priviliges"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <PriviligesPage />
              </Suspense>
            }
          />
          {/* Paramètres */}
          <Route
            path="/formalirers"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <Formalirers />
              </Suspense>
            }
          />
          <Route
            path="/types-des-reservations"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <TypesDesReservationsPage />
              </Suspense>
            }
          />
          <Route
            path="/types-des-reservations/create"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <TypesDesReservationsCreatePage />
              </Suspense>
            }
          />
          <Route
            path="/etats-des-reservations"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <EtatsDesReservationsPage />
              </Suspense>
            }
          />
          {/* Réservations */}
          <Route
            path="/reservations"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <ReservationsPage />
              </Suspense>
            }
          />
          <Route
            path="/reservations/create"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <ReservationsCreatePage />
              </Suspense>
            }
          />
          <Route
            path="/reservations/planifier"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <ReservationsPlanifierPage />
              </Suspense>
            }
          />
          <Route
            path="/reservations/details/:reservation_id"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <DetailsReservationPage />
              </Suspense>
            }
          />
          {/* Véhicules */}
          <Route
            path="/vehicules"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <VehiculesPage />
              </Suspense>
            }
          />
          <Route
            path="/vehicules-avec-reservations"
            element={
              <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
              }>
                <VehiculesAvecReservations />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/*"
          element={
            <Suspense fallback={
                  <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
            }>
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
