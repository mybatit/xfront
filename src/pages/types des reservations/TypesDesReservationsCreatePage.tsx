import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Account, EtatsDesReservations, User } from "@/types/types";
import Loader from "@/components/ui/Elements/Loader";

import "react-toastify/dist/ReactToastify.css";
import { notifyErreur } from "@/lib/methods";
// Types
interface FormData {
  account_id: string;
  name: string;
  form_id: string;
  reservationsstatuses_ids: ReservationStatus[];
}

interface ReservationStatus {
  reservationsstatuses_id: string;
  user_ids: number[];
}
interface Form {
  id: number;
  created_at: string; // ou Date, selon tes besoins
  updated_at: string; // ou Date, selon tes besoins
  name: string;
  description: string | null;
  created_by: number;
  account_id: number;
  deleted_at: string | null; // ou Date, selon tes besoins
  deleted: number;
  deleted_by: number | null;
  restored_at: string | null; // ou Date, selon tes besoins
  restored: number;
  restored_by: number | null;
  code_objects: string;
  code_synchronisations: string;
  code_unique_id: number;
}
export default function TypesDesReservationsCreatePage() {
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState<FormData>({
    account_id: "",
    name: "",
    form_id: "",
    reservationsstatuses_ids: [],
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
          //   setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching comptes:", error);
        // setLoading(false);
      }
    };
    fetchaccounts();
  }, [token]);

  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/forms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("response: ", response);
          throw new Error("Failed to fetch forms");
        }

        const data = await response.json();
        console.log("data: ", data);
        console.log("data.my_items: ", data.my_items);
        // console.log("data.$my_items: ", data.$my_items);

        if (data.my_items) {
          setForms(data.my_items); // Update state with fetched data
          //   setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
        // setLoading(false);
      }
    };
    fetchaccounts();
  }, [token]);

  const [statusDesReservations, setStatusDesReservations] = useState<
    EtatsDesReservations[]
  >([]);

  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/reservations-statuses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("response ", response);
          throw new Error("Failed to fetch etatsDesReservations");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.my_items) {
          setStatusDesReservations(data.my_items); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching etatsDesReservations:", error);
        // setError("Failed to load etatsDesReservations. Please try again later.");
        // setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);

  const [utilisateurs, setUtilisateurs] = useState<User[]>([]);
  useEffect(() => {
    setLoading(true);
    // setError(null);
    const fetchusers = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/users`,
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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // setError("Failed to load users. Please try again later.");
        // setLoading(false);
      }
    };

    fetchusers();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addReservationStatus = () => {
    setFormData((prev) => ({
      ...prev,
      reservationsstatuses_ids: [
        ...prev.reservationsstatuses_ids,
        { reservationsstatuses_id: "", user_ids: [] },
      ],
    }));
  };

  const removeReservationStatus = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reservationsstatuses_ids: prev.reservationsstatuses_ids.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleStatusChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      reservationsstatuses_ids: prev.reservationsstatuses_ids.map((status, i) =>
        i === index ? { ...status, reservationsstatuses_id: value } : status
      ),
    }));
  };

  const handleUserChange = (statusIndex: number, userId: number) => {
    setFormData((prev) => ({
      ...prev,
      reservationsstatuses_ids: prev.reservationsstatuses_ids.map((status, i) =>
        i === statusIndex
          ? {
              ...status,
              user_ids: status.user_ids.includes(userId)
                ? status.user_ids.filter((id) => id !== userId)
                : [...status.user_ids, userId],
            }
          : status
      ),
    }));
  };
  const validateForm = () => {
    // Validation des champs
    if (!formData.account_id) {
      notifyErreur("Veuillez sélectionner un compte.");
      setSubmitting(false);
      return;
    }

    if (!formData.name.trim()) {
      notifyErreur("Veuillez entrer un nom.");
      setSubmitting(false);
      return;
    }

    if (!formData.form_id) {
      notifyErreur("Veuillez sélectionner un form.");
      setSubmitting(false);
      return;
    }
    if (!formData.reservationsstatuses_ids) {
        notifyErreur("Veuillez sélectionner les statuts des réservations.");
        setSubmitting(false);
        return;
      }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!validateForm()) {
      return;
    }
    console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await fetch(
        "http://xapi.vengoreserve.com/api/create/reservation-type",
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
        console.log("Type de Réservation créée avec succès :", data);
        navigate("/types-des-reservations");
      } else {
        console.error(
          "Erreur lors de la création de la type de réservation :",
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
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-screen ">
      <div className="flex flex-1 flex-col lg:flex-row ">
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">Type des Réservations</h3>
          <Link to="/types-des-reservations">
            <Button className="w-full mb-4" variant="outline">
              Types des reservations
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
          <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              {`Ajout d'un Type de reservation`}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 max-w-full mx-auto p-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account_id">Compte</Label>
                      <Select
                        value={formData.account_id}
                        onValueChange={(value) =>
                          handleSelectChange("account_id", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {comptes.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.id.toString()}
                            >
                              {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="form_id">Formalirer</Label>
                      <Select
                        value={formData.form_id}
                        onValueChange={(value) =>
                          handleSelectChange("form_id", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                        <SelectContent>
                          {forms.map((form) => (
                            <SelectItem
                              key={form.id}
                              value={form.id.toString()}
                            >
                              {form.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Reservation Statuses</Label>
                    {formData.reservationsstatuses_ids.map((status, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <Select
                              value={status.reservationsstatuses_id.toString()}
                              onValueChange={(value) =>
                                handleStatusChange(index, value)
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {statusDesReservations.map((s) => (
                                  <SelectItem
                                    key={s.id}
                                    value={s.id.toString()}
                                  >
                                    {s.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeReservationStatus(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {utilisateurs.map((user) => (
                              <Label
                                key={user.id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={status.user_ids.includes(user.id)}
                                  onChange={() =>
                                    handleUserChange(index, user.id)
                                  }
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>{user.username}</span>
                              </Label>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={addReservationStatus}
                      className="w-full bord border-2 border-sky-500"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Reservation Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" >
                Submit
              </Button> */}
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
                  "Créer d'un Type de reservatio Réservation"
                )}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
