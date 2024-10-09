import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ReservationsCreatePage() {
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
    setLoading(false); // Set loading to false after checking token
  }, [navigate]);

  console.log(decodedToken);
  console.log(loading);



  const [formData, setFormData] = useState({
    description: "",
    account_id: 1,
    reservationstypes_id: 1,
    vehicle_id: 1,
    user_id: [1, 2, 3],
    date_start: "",
    date_end: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    // Créer la réservation en envoyant une requête POST
    try {
        const response = await fetch('http://xapi.vengoreserve.com/api/create/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData), // Envoyer les données du formulaire
        });
  
        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          console.log("Réservation créée avec succès :", data);
          navigate("/reservations");

        } else {
            setLoading(false);

          console.error("Erreur lors de la création de la réservation :", response.status);
        }
      } catch (error) {
        setLoading(false);
        console.error("Erreur de connexion :", error);
      }
  };

  return (
    <div className="flex flex-col">
      {/* Contenu Principal */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* côté */}
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">Recherche Réservation</h3>
          <Link to="/reservations">
            <Button className="w-full" variant="outline">
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
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full mx-auto p-4"
          >
            <h1 className="text-2xl font-bold mb-4">Créer Réservation</h1>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="account_id"
                className="block text-sm font-medium mb-1"
              >
                ID Compte
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("account_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'ID du compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="reservationstypes_id"
                className="block text-sm font-medium mb-1"
              >
                ID Type de Réservation
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("reservationstypes_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'ID du type de réservation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="vehicle_id"
                className="block text-sm font-medium mb-1"
              >
                ID Véhicule
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("vehicle_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'ID du véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="35">35</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="date_start"
                className="block text-sm font-medium mb-1"
              >
                Date de Début
              </label>
              <Input
                type="datetime-local"
                id="date_start"
                name="date_start"
                value={formData.date_start}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="date_end"
                className="block text-sm font-medium mb-1"
              >
                Date de Fin
              </label>
              <Input
                type="datetime-local"
                id="date_end"
                name="date_end"
                value={formData.date_end}
                onChange={handleChange}
              />
            </div>
            {loading ? (
                <Button
                  disabled
                  className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
              Créer Réservation
            </Button>
             )}
          </form>
        </main>
      </div>
    </div>
  );
}
