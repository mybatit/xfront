import { useState } from "react";
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

import { Link } from "react-router-dom";

export default function CreateUtilisateursPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accountId, setAccountId] = useState("7");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      email,
      password,
      passwordConfirmation,
      accountId,
    });
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
              {`Ajout d'un utisateur`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champ Email */}
              <div className="flex items-center">
                <Label
                  htmlFor="email"
                  className="w-1/3 text-right mr-4 text-blue-500"
                >
                  * Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-2/3"
                />
              </div>

              {/* Champ Password */}
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="w-1/3 text-right mr-4 text-blue-500"
                >
                  * Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-2/3"
                />
              </div>

              {/* Champ password_confirmation*/}
              <div className="flex items-center">
                <Label
                  htmlFor="password-confirmation"
                  className="w-1/3 text-right mr-4 text-blue-500"
                >
                  * password-confirmation
                </Label>
                <Input
                  id="password-confirmation"
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-2/3"
                />
              </div>

              {/* Autres champs similaires */}
              <div className="flex items-center">
                <Label
                  htmlFor="account-id"
                  className="w-1/3 text-right mr-4 text-blue-500"
                >
                  * account_id
                </Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger id="account-id" className="w-2/3">
                    <SelectValue placeholder="Sélectionnez le compte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Compte 7</SelectItem>
                    <SelectItem value="8">Compte 8</SelectItem>
                    <SelectItem value="9">Compte 9</SelectItem>
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
