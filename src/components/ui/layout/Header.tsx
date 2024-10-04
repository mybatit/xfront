import { CreditCard, Settings, User, LifeBuoy, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";

import { ChevronDown, Gauge, HelpCircle, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "../button";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className=" p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">praxedo</h1>
            <Input className="w-64" placeholder="Search..." />
            <Button variant="default" className="bg-sky-500 hover:bg-sky-600">
              <Search />
            </Button>
            <Button
              variant="default"
              className="text-white border-white bg-sky-500 hover:bg-sky-600"
            >
              Créer <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="default"
              className="text-white border-white bg-sky-500 hover:bg-sky-600"
            >
              <Gauge className="mr-2 h-4 w-4" />
              Cockpit
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-black">
              <HelpCircle className="h-5 w-5" />
              <span className="ml-2">{`Centre d'aide`}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-black">
                  Farhan Mohammad <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Facturation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    location.href = "/login";
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#003049] text-white ">
        <div className="flex items-center">
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Synthèse
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-screen w-full">
              <Button
                variant="outline"
                className="appearance-none bg-transparent border-none h-full w-full m-0 hover:bg-sky-600 p-4 flex items-center"
              >
                Administration <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#003049] text-white">
              <DropdownMenuGroup className="">
                <DropdownMenuItem>
                  <Link
                    to="#"
                  >
                    Creer Compte 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Liste des comptes 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Creer Utilisateur 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Liste des Utilisateurs 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Creer role 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Liste des roles 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Creer champ personalises 
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link
                    to="#"
                  >
                    Lister champ personalises  
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Vehicules <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
          {/* <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Cartographie <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Géolocalisation <ChevronDown className="ml-2 h-4 w-4" />
          </Link> */}
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Paramètres <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
        </div>
        {/* <div className="flex space-x-4">
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Articles <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Paramètres <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
          <Link to="#" className="hover:bg-sky-600 p-4 flex items-center">
            Administration <ChevronDown className="ml-2 h-4 w-4" />
          </Link>
        </div> */}
      </nav>
    </>
  );
};

export default Header;
