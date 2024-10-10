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
    account_id:1,
    reservationstypes_id: 1,
    vehicle_id: 1,
    user_id: [18, 21, 22],
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
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
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
                value={formData.date_start.replace(" ", "T").slice(0, 16)}
                onChange={(e) => handleDateChange("date_start", e.target.value)}
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
                value={formData.date_end.replace(" ", "T").slice(0, 16)}
                onChange={(e) => handleDateChange("date_end", e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
