import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Pencil, Bell, Trash, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/ui/Elements/Loader";
interface User {
  id: number;
  username: string;
  email: string;
  profile_photo_url: string;
}

interface MyReservation {
  id: number;
  matricule: string;
  description: string;
  status: string;
  reservation_type: string;
  account_name: string;
  date_creation: string;
  date_start: string;
  date_end: string;
  vehicle_matricule: number;
  code_objects: string;
  code_synchronisations: string;
  pickup: string | null;
  dropoff: string | null;
  myreservation_users: User[];
}

function DetailsReservationPage() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState<MyReservation>();
  // // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [decodedToken, setDecodedToken] = useState(null);
  const [token, settoken] = useState(""); // Add loading state

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        settoken(token);
        // Deserialize the JWT token
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Set user information based on decoded token
        // console.log("Decoded Token:", decodedToken);
        setDecodedToken(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle token decoding errors (e.g., invalid token)
        localStorage.removeItem("token"); // Clear invalid token
      }
    } else {
      navigate("/login");
    }
    // setLoading(false); // Set loading to false after checking token
  }, [navigate]);
  // console.log(token);
  console.log(decodedToken);
  console.log(loading);

  useEffect(() => {
    setLoading(true);
    // setError(null);
    const fetchreservations = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/reservation/${reservation_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservation");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.myreservation) {
          setReservation(data.myreservation); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
        // setError("Failed to load reservation. Please try again later.");
        // setLoading(false);
      }
    };

    fetchreservations();
  }, [token, reservation_id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-screen ">
      <div className="flex flex-1 flex-col lg:flex-row ">
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">List des Réservation</h3>
          <Link to="/reservations">
            <Button className="w-full mb-4" variant="outline">
              Réservations
            </Button>
          </Link>

          <div>
            <h3 className="mb-2 font-medium">Export</h3>
            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              Exporter
            </Button>
          </div>
        </aside>
        <main className="w-full flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <NotebookPen className="mr-2" /> Details de Réservation
            </h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">ID</span>
                    <span>{reservation?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Matricule</span>
                    <span>{reservation?.matricule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Description</span>
                    <span>{reservation?.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Statut</span>
                    <span>{reservation?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type de réservation</span>
                    <span>{reservation?.reservation_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Nom du compte</span>
                    <span>{reservation?.account_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date de création</span>
                    <span>{reservation?.date_creation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date de début</span>
                    <span>{reservation?.date_start}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date de fin</span>
                    <span>{reservation?.date_end}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Matricule du véhicule</span>
                    <span>{reservation?.vehicle_matricule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Code objets</span>
                    <span>{reservation?.code_objects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Code synchronisations</span>
                    <span>{reservation?.code_synchronisations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Point de ramassage</span>
                    <span>{reservation?.pickup ?? "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Point de dépôt</span>
                    <span>{reservation?.dropoff ?? "-"}</span>
                  </div>
                </div>

                <div className="col-span-2 mt-4">
                  <h2 className="font-medium">Utilisateurs associés</h2>
                  <div className="space-y-2">
                    {reservation?.myreservation_users.map((user) => (
                      <div className="flex justify-between" key={user.id}>
                        <div className="flex items-center space-x-4">
                          <img
                            src={user.profile_photo_url}
                            alt={user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{user.username}</span>
                        </div>
                        <span>{user.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default DetailsReservationPage;
