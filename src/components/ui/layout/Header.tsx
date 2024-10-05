import { useState } from "react";
import {
  CreditCard,
  Settings,
  User,
  LifeBuoy,
  LogOut,
  Search,
  ChevronDown,
  Gauge,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
  // State to handle mobile menu collapse
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src="/Vengo-reserve.png"
                alt="Praxedo Logo"
                width={200}
                height={50}
                className="h-10"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2">
              <Input className="w-64" placeholder="Search..." />
              <Button variant="default" className="bg-sky-500 hover:bg-sky-600">
                <Search />
              </Button>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black border-black"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Actions */}
        {menuOpen && (
          <div className="flex flex-col space-y-4 mt-4 md:hidden">
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
        )}
      </header>

      {/* Mobile Menu Collapse */}
      <nav
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-[#003049] text-white `}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link to="#">
              <Button
                variant="outline"
                className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
              >
                Synthèse
              </Button>
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
            >
              Vehicules <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#003049] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#"></Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
            >
              Resrvations <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#003049] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#"></Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
            >
              Administration <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#003049] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Utilisateurs</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="#">comptes</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="#">roles</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="#">priviliges</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
            >
              Paramètres <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#003049] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Referentiels</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Formalirers</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Types des reservations</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Types d'activities</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">Etats de reservation</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="#">type d'acttivities</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center bg-[#003049] text-white">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link to="#">
                <Button
                  variant="outline"
                  className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
                >
                  Synthèse
                </Button>
              </Link>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
              >
                Vehicules <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#003049] text-white">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#"></Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
              >
                Resrvations <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#003049] text-white">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#"></Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
              >
                Paramètres <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#003049] text-white">
              {/* parametres (  Referentiels / Formalirers , types des  reservations types d'activities   / etats de reservation  / type d'acttivities  ) */}
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Referentiels</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Formalirers</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Types des reservations</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Types d'activities</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Etats de reservation</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">type d'acttivities</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="  bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
              >
                Administration <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#003049] text-white">
              {/* ( users / accounts  / roles  /  priviliges... ) */}
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="#">Utilisateurs</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to="#">comptes</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to="#">roles</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to="#">priviliges</Link>
                </DropdownMenuItem>

                {/* <DropdownMenuItem>
                  <Link to="#">Creer Compte</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="#">Creer Utilisateur</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="#">Creer role</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="#">Creer champ personalises</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="#">Lister champ personalises</Link>
                </DropdownMenuItem> */}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Header;
