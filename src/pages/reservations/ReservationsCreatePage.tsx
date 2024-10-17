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
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Account, ReservationsType, Vehicules } from "@/types/types";
// import Link from "next/link"

interface FormData {
  description: string;
  account_id: number;
  reservationstypes_id: number;
  vehicle_id: number;
  user_id: number[];
  date_start: string;
  date_end: string;
}

export default function ReservationsCreatePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    description: "",
    account_id: 1,
    reservationstypes_id: 1,
    vehicle_id: 1,
    user_id: [],
    date_start: "",
    date_end: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
        setToken(storedToken);
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const [comptes, setComptes] = useState<Account[]>([]);
  useEffect(() => {
    setLoading(true);
    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("response: ", response);
          throw new Error("Failed to fetch comptes");
        }

        const data = await response.json();
        console.log("data: ", data);
        console.log("data.myaccounts: ", data.myaccounts);
        // console.log("data.$myaccounts: ", data.$myaccounts);

        if (data.myaccounts) {
          setComptes(data.myaccounts); // Update state with fetched data
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching comptes:", error);
        // setLoading(false);
      }
    };
    fetchaccounts();
  }, [token]);


  const [reservationsTypes, setReservationsTypes] = useState<ReservationsType[]>([]);
  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/reservations-types`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("response ", response);
          throw new Error("Failed to fetch reservationsTypes");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.data_items) {
          setReservationsTypes(data.data_items); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reservationsTypes:", error);
        // setError("Failed to load reservationsTypes. Please try again later.");
        // setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);


  const [vehicles, setVehicles] = useState<Vehicules[]>([]);
  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchvehicles = async () => {
      try {
        
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/vehicles`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.data_items) {
          setVehicles(data.data_items); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // setError("Failed to load vehicles. Please try again later.");
        // setLoading(false);
      }
    };

    fetchvehicles();
  }, [token]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleDateChange = (name: string, value: string) => {
    const formattedDate = new Date(value)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    setFormData((prev) => ({ ...prev, [name]: formattedDate }));
  };
  const users = [
    { id: 1, first_name: "User1" },
    // { "id": 2, "first_name": "User2" },
    // { "id": 3, "first_name": "User3" },
    // { "id": 4, "first_name": "User4" },
    // { "id": 5, "first_name": "User5" },
    // { "id": 6, "first_name": "User6" },
    // { "id": 7, "first_name": "User7" },
    // { "id": 8, "first_name": "User8" },
    // { "id": 9, "first_name": "User9" },
    { id: 10, first_name: "User10" },
    { id: 18, first_name: "User18" },
    { id: 21, first_name: "User21" },
    { id: 22, first_name: "User22" },
  ];

  const handleUserIdChange = (userId: number) => {
    setFormData((prev) => {
      const newUserIds = prev.user_id.includes(userId)
        ? prev.user_id.filter((id) => id !== userId)
        : [...prev.user_id, userId];
      return { ...prev, user_id: newUserIds };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("formData :", formData);

    try {
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
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-screen ">
      <div className="flex flex-1 flex-col lg:flex-row ">
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">Recherche Réservation</h3>
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
          <form
            onSubmit={handleSubmit}
            className="space-y-2 w-full max-w-full mx-auto p-4"
          >
            <h1 className="text-2xl font-bold mb-4">Créer Réservation</h1>

            {/* Ligne pour les sélections */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
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
                    <SelectValue placeholder="Sélectionnez le nom du compte" />
                  </SelectTrigger>
                  <SelectContent>
                    {comptes.map((compte, index) => (
                      <SelectItem key={index} value={compte.id.toString()}>
                        {compte.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
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
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                  {reservationsTypes.map((compte, index) => (
                      <SelectItem key={index} value={compte.id.toString()}>
                        {compte.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
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
                    <SelectValue placeholder="Sélectionnez le véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                  {vehicles.map((compte, index) => (
                      <SelectItem key={index} value={compte.id.toString()}>
                        {compte.brand} ( {compte.model})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sélection des utilisateurs */}
            <div className="flex-1 mt-4">
              <label className="block text-sm font-medium mb-1">
                Sélectionnez les Utilisateurs
              </label>
              <div className="flex flex-wrap gap-5">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center p-2 rounded-md ${
                      formData.user_id.includes(user.id)
                        ? "border-2 border-sky-600"
                        : "border-2 border-transparent"
                    }`}
                  >
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
            </div>

            {/* Dates sur une ligne */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex-1">
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
                  value={formData.date_start.replace(" ", "T").slice(0, 16)}
                  onChange={(e) =>
                    handleDateChange("date_start", e.target.value)
                  }
                />
              </div>

              <div className="flex-1">
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
                  value={formData.date_end.replace(" ", "T").slice(0, 16)}
                  onChange={(e) => handleDateChange("date_end", e.target.value)}
                />
              </div>
            </div>

            {/* Description en bas */}
            <div className="mt-4">
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

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full mt-4 text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-50"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer Réservation"
              )}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
