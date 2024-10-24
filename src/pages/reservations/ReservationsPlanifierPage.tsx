import { useEffect, useState, useMemo } from "react";
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
import { Loader2, Plus, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { Checkbox } from "@/components/ui/checkbox";
import { Account, ReservationsType, User, Vehicules } from "@/types/types";
// import Link from "next/link"
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Loader from "@/components/ui/Elements/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface FormData {
  account_id: number;
  reservationstypes_id: number;
  vehicle_id: number | null; // Nullable field
  user_ids: number[] | null; // Nullable array
  before_date_start: string;
  date_start: string | null; // Nullable field
  date_end: string | null; // Nullable field
  after_date_end: string;
  description: string;
}

export default function ReservationsPlanifierPage() {
  // const [loading, setLoading] = useState(true);
  // const [loadingComptes, setLoadingComptes] = useState(true);
  const [loadingUtilisateurs, setLoadingUtilisateurs] = useState(true);
  // const [loadingReservationsTypes, setLoadingReservationsTypes] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    description: "",
    account_id: 0, // Initialize with a number
    reservationstypes_id: 0, // Initialize with a number
    vehicle_id: null, // Nullable field
    user_ids: [],
    date_start: null, // Nullable field
    date_end: null, // Nullable field
    before_date_start: "",
    after_date_end: "",
  });
  const { toast } = useToast();

  function showToast(msg: string) {
    toast({
      variant: "destructive",
      title: "Error",
      description: msg,
      action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
    });
  }

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
  }, [navigate]);

  const [comptes, setComptes] = useState<Account[]>([]);
  useEffect(() => {
    // setLoadingComptes(true);
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
          // setLoadingComptes(false);
        }
      } catch (error) {
        console.error("Error fetching comptes:", error);
        // setLoadingComptes(false);
      }
    };
    fetchaccounts();
  }, [token]);

  const [utilisateurs, setUtilisateurs] = useState<User[]>([]);
  useEffect(() => {
    setLoadingUtilisateurs(true);
    // setError(null);
    const fetchusers = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/users?account_id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.my_items) {
          setUtilisateurs(data.my_items); // Update state with fetched data
          // setError(null);
          setLoadingUtilisateurs(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // setError("Failed to load users. Please try again later.");
        // setLoadingUtilisateurs(false);
      }
    };

    fetchusers();
  }, [token, accountId]);

  const [reservationsTypes, setReservationsTypes] = useState<
    ReservationsType[]
  >([]);
  useEffect(() => {
    // setLoadingReservationsTypes(true);
    // setError(null);

    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/reservations-types?account_id=${accountId}`,
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
        if (data.my_items) {
          setReservationsTypes(data.my_items); // Update state with fetched data
          // setError(null);
          // setLoadingReservationsTypes(false);
        }
      } catch (error) {
        console.error("Error fetching reservationsTypes:", error);
        // setError("Failed to load reservationsTypes. Please try again later.");
        // setLoadingReservationsTypes(false);
      }
    };

    fetchaccounts();
  }, [token, accountId]);

  const [vehicles, setVehicles] = useState<Vehicules[]>([]);
  useEffect(() => {
    // setLoading(true);
    // setError(null);

    const fetchvehicles = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/vehicles?account_id=${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.my_items) {
          setVehicles(data.my_items); // Update state with fetched data
          // setError(null);
          // setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // setError("Failed to load vehicles. Please try again later.");
        // setLoading(false);
      }
    };

    fetchvehicles();
  }, [token, accountId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));

    if (name === "account_id") {
      setAccountId(value);
    }
  };

  const handleDateChange = (name: string, value: string) => {
    const formattedDate = new Date(value)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    setFormData((prev) => ({ ...prev, [name]: formattedDate }));
  };

  const handleSelectUser = (userId: number) => {
    setFormData((prev) => ({
      ...prev,
      user_ids: prev.user_ids ? [...prev.user_ids, userId] : [userId],
    }));
  };

  // ===========================================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Array of User type
  const [showResults, setShowResults] = useState(true);

  const searchResults = useMemo(() => {
    return utilisateurs.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
    );
  }, [searchQuery, selectedUsers, utilisateurs]);

  // const handleSearch = () => {
  //   setShowResults(true);
  // };

  const addUser = (user: User) => {
    // Explicitly typed user
    setSelectedUsers([...selectedUsers, user]);
    handleSelectUser(user.id);
  };

  const removeUser = (userId: number) => {
    // Parameter userId is a number
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const clearAllUsers = () => {
    setSelectedUsers([]);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  // ===========================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.account_id) {
      showToast("Veuillez sélectionner un compte.");
      return false;
    }

    if (!formData.reservationstypes_id) {
      showToast("Veuillez sélectionner un type de réservation.");
      return false;
    }

    if (!formData.vehicle_id) {
      showToast("Veuillez sélectionner un véhicule.");
      return false;
    }

    if (!formData.date_start) {
      showToast("Veuillez sélectionner une date de début.");
      return false;
    }

    if (!formData.date_end) {
      showToast("Veuillez sélectionner une date de fin.");
      return false;
    }

    if (!formData.description.trim()) {
      showToast("Veuillez entrer une description.");
      return false;
    }

    if (formData?.user_ids?.length === 0) {
      showToast("Veuillez sélectionner au moins un utilisateur.");
      return false;
    }

    if (!formData.before_date_start.trim()) {
      showToast("Veuillez entrer une date de début valide.");
      return false;
    }

    if (!formData.after_date_end.trim()) {
      showToast("Veuillez entrer une date de fin valide.");
      return false;
    }

    setSubmitting(true);
    console.log("formData :", formData);
    console.log("selectedUsers :", selectedUsers);

    try {
      const response = await fetch(
        "http://xapi.vengoreserve.com/api/create/reservation",
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
        navigate(`/reservations/details/${data.myreservation.id}`);
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

  // if (loading) {
  //   return (
    //   <div className="flex justify-center items-center h-screen">
    //     <Loader />
    //   </div>
  //   );
  // }

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
          <form
            onSubmit={handleSubmit}
            className="space-y-2 w-full max-w-full mx-auto p-4"
          >
            <h1 className="text-2xl font-bold mb-4">Planification d'une Réservation</h1>

            {/* Ligne pour les sélections */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex-1">
                <label
                  htmlFor="account_id"
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Compte
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
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Type de Réservation
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
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Véhicule
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

            <div className="max-w-full mx-auto p-4 space-y-4">
              <label
                htmlFor="selectionnez"
                className="block text-sm font-medium mb-1 text-blue-500"
              >
                * Sélectionnez les Utilisateurs
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="text"
                  placeholder="Search for a user"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                  id="selectionnez"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2 border rounded-md p-2">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold">
                      Résultats de la recherche :
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleResults}
                      type="button"
                    >
                      {showResults ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      {showResults ? "Hide" : "Show"}
                    </Button>
                  </div>
                  {loadingUtilisateurs ? (
                    <Loader />
                  ) : (
                    showResults && (
                      <div className="max-h-60 overflow-y-auto">
                        <ul className="space-y-1">
                          {searchResults.map((user) => (
                            <li
                              key={user.id}
                              className="flex justify-between items-center"
                            >
                              <span>{user.username}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addUser(user)}
                              >
                                <Plus size={12} />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

                <div className="w-full sm:w-1/2 border rounded-md p-2">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold">
                      Utilisateurs sélectionnés :
                    </h2>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={clearAllUsers}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <ul className="space-y-1">
                      {selectedUsers.map((user) => (
                        <li
                          key={user.id}
                          className="flex justify-between items-center"
                        >
                          <span>{user.username}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUser(user.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Dates sur une ligne */}
            <div className="flex flex-wrap gap-4 mt-4 p-4">
              {/* Date avant Début */}
              <div className="flex-1">
                <label
                  htmlFor="before_date_start"
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Date avant Début
                </label>
                <Input
                  type="datetime-local"
                  id="before_date_start"
                  name="before_date_start"
                  value={
                    formData.before_date_start
                      ? formData.before_date_start
                          .replace(" ", "T")
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleDateChange("before_date_start", e.target.value)
                  }
                />
              </div>

              {/* Date de Début */}
              <div className="flex-1">
                <label
                  htmlFor="date_start"
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Date de Début
                </label>
                <Input
                  type="datetime-local"
                  id="date_start"
                  name="date_start"
                  value={
                    formData.date_start
                      ? formData.date_start.replace(" ", "T").slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleDateChange("date_start", e.target.value)
                  }
                />
              </div>

              {/* Date de Fin */}
              <div className="flex-1">
                <label
                  htmlFor="date_end"
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Date de Fin
                </label>
                <Input
                  type="datetime-local"
                  id="date_end"
                  name="date_end"
                  value={
                    formData.date_end
                      ? formData.date_end.replace(" ", "T").slice(0, 16)
                      : ""
                  }
                  onChange={(e) => handleDateChange("date_end", e.target.value)}
                />
              </div>

              {/* Date après Fin */}
              <div className="flex-1">
                <label
                  htmlFor="after_date_end"
                  className="block text-sm font-medium mb-1 text-blue-500"
                >
                  * Date après Fin
                </label>
                <Input
                  type="datetime-local"
                  id="after_date_end"
                  name="after_date_end"
                  value={
                    formData.after_date_end
                      ? formData.after_date_end.replace(" ", "T").slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleDateChange("after_date_end", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Description en bas */}
            <div className="mt-4 p-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1 text-blue-500"
              >
                * Description
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
              className="w-full mt-4 mx-4 text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-50"
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
