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
  const [token, setToken] = useState(""); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setToken(token);
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setDecodedToken(decodedToken);

      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);
  console.log(decodedToken);

  // Récupérer la liste des utilisateurs depuis une API
  const [formData, setFormData] = useState({
    description: "",
    account_id: 1,
    reservationstypes_id: 1,
    vehicle_id: 1,
    user_id: [], //user_id:[18,21,22]
    date_start: "2025-4-08 10:00:00",
    date_end: "2025-5-5 18:00:00",
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

//   const handleUserIdChange = (userId: number) => {
//     setFormData((prev) => {
//       const newUserIds = prev.user_id.includes(userId)
//         ? prev.user_id.filter((id) => id !== userId)
//         : [...prev.user_id, userId];
//       return { ...prev, user_id: newUserIds };
//     });
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        console.log("formData : ",formData);
        
      const response = await fetch(
        "http://xapi.vengoreserve.com/api/create/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Réservation créée avec succès :", data);
        navigate("/reservations");
      } else {
        console.error(
          "Erreur lors de la création de la réservation :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
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
            {/* Sélection des utilisateurs */}
            {/* <div>
              <label className="block text-sm font-medium mb-1">User IDs</label>
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={formData.user_id.includes(user.id)}
                      onCheckedChange={() => handleUserIdChange(user.id)}
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {user.first_name} (ID: {user.id})
                    </label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Autres champs du formulaire */}
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
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600"
              >
                Créer Réservation
              </Button>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
