import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useNavigate } from "react-router-dom";
import { Account } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Définir une interface pour les données du formulaire
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  tel: string;
  password: string;
  password_confirmation: string;
  account_id: number;
}

export default function CreateUtilisateursPage() {
  // Utiliser l'interface FormData pour les types des états
  const [email, setEmail] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [comptes, setComptes] = useState<Account[]>([]);

  const [decodedToken, setDecodedToken] = useState(null);
  const [token, settoken] = useState(""); // Add loading state
  const { toast } = useToast();

  function showToast(msg: string, type: string) {
    const variant =
      type === "success"
        ? "success"
        : type === "warning"
        ? "warning"
        : type === "error"
        ? "destructive"
        : "default"; // default if no matching type

    toast({
      variant: variant, // dynamically set variant based on type
      title:
        type === "error" ? "Ajout d'une erreur utilisateur" : "Notification",
      description: msg,
      action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
    });
  }
  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        settoken(token);
        // Deserialize the JWT token
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Set user information based on decoded token
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
  console.log("Decoded Token:", decodedToken);
  console.log("loading:", loading);

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
        setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      email,
      password,
      last_name,
      first_name,
      tel,
      password_confirmation: passwordConfirmation,
      account_id: parseInt(accountId, 10),
    };
    console.log("Form submitted", formData);

    if (!formData?.email) {
      showToast("Veuillez entrer un E-mail.", "error");
      return false;
    }
    if (!formData?.first_name) {
      showToast("Veuillez entrer le nom.", "error");
      return false;
    }
    if (!formData?.last_name) {
      showToast("Veuillez entrer le prenom.", "error");
      return false;
    }
    if (!formData?.tel) {
      showToast("Veuillez entrer le numéro de téléphone.", "error");
      return false;
    }
    if (!formData?.password) {
      showToast("Veuillez entrer un Mot de passe.", "error");
      return false;
    }
    if (!formData?.password_confirmation) {
      showToast("Veuillez entrer Confirmation du mot de passe.", "error");
      return false;
    }
    try {
      console.log("Form submitted", formData);
      console.log("token", token);
      const response = await fetch(
        `http://xapi.vengoreserve.com/api/create/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("response :", response);

      if (!response.ok) {
        // showToast("Erreur lors de la soumission du formulaire", "warning");
        throw new Error("Erreur lors de la soumission du formulaire");
      }

      const data = await response.json();
      if (data) {
        showToast("L'utilisateur a été ajouté avec succès", "success");
        console.log("Réponse de l'API:", data);
        navigate("/utilisateurs");
      }

      // Vous pouvez ajouter un message de succès ou rediriger l'utilisateur après la soumission réussie.
    } catch (error) {
      console.error("Erreur:", error);
      // Vous pouvez gérer l'erreur ici (affichage d'un message d'erreur à l'utilisateur).
    }
  };

  return (
    <div className="flex flex-col max-h-screen ">
      <div className="flex flex-1 flex-col lg:flex-row ">
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">Recherche Réservation</h3>
          <Link to="/utilisateurs">
            <Button className="w-full mb-4" variant="outline">
              Utilisateurs
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
              {`Ajout d'un utilisateur`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champ Email */}
              <div className="flex items-center">
                <Label
                  htmlFor="email"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * E-mail
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-2/3"
                />
              </div>
              {/* Champ last_name */}
              <div className="flex items-center">
                <Label
                  htmlFor="last_name"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * Nom
                </Label>

                <Input
                  id="last_name"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  className="w-2/3"
                />
              </div>
              {/* Champ prenom */}
              <div className="flex items-center">
                <Label
                  htmlFor="first_name"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * Prénom
                </Label>

                <Input
                  id="first_name"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-2/3"
                />
              </div>
              {/* Champ tel */}
              <div className="flex items-center">
                <Label
                  htmlFor="tel"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * Téléphone
                </Label>

                <Input
                  id="tel"
                  type="text"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="w-2/3"
                />
              </div>
              {/* Champ Password */}
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-2/3"
                />
              </div>

              {/* Champ password_confirmation */}
              <div className="flex items-center">
                <Label
                  htmlFor="password-confirmation"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  Confirmation du mot de passe
                </Label>
                <Input
                  id="password-confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-2/3"
                />
              </div>

              {/* Champ account_id */}
              <div className="flex items-center">
                <Label
                  htmlFor="account-id"
                  className="w-1/3  mr-4 text-blue-500"
                >
                  * Compte
                </Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger id="account-id" className="w-2/3">
                    <SelectValue placeholder="Sélectionnez le compte" />
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

              <div className="flex justify-start space-x-4 mt-6 ml-[33%]">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Enregistrer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
