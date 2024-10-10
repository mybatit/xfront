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
  // Define menu items
  const menuItemsLeft = [
    { label: "Synthèse", path: "/" },
    {
      label: "Véhicules",
      subItems: [
        { label: "Véhicules", path: "/vehicules" },
        {
          label: "Véhicules avec réservations",
          path: "/vehicules-avec-reservations",
        },
      ],
    },
    {
      label: "Planning",
      subItems: [
        { label: "Planning véhicules", path: "#" },
        { label: "Planning users", path: "#" },
      ],
    },
    {
      label: "Cartographie",
      path: "/cartographie",
    },
    {
      label: "Géolocalisation",
      subItems: [],
    },
    {
      label: "Réservations",
      subItems: [
        { label: "Recherche avancée", path: "#" },
        { label: "Groupes des réservations", path: "#" },
        { label: "Récurrences", path: "#" },
        { label: "Exports", path: "#" },
        { label: "Suivi cartes carburant", path: "#" },
        { label: "Suivi jawaz", path: "#" },
        { label: "Reservations", path: "/reservations" },
      ],
    },
  ];

  const menuItemsRight = [
    {
      label: "Paramètres",
      subItems: [
        { label: "Référentiels", path: "#" },
        { label: "Formalirers", path: "#" },
        { label: "Types des réservations", path: "#" },
        { label: "Types d'activités", path: "#" },
        { label: "États de réservation", path: "#" },
      ],
    },
    {
      label: "Administration",
      subItems: [
        { label: "Utilisateurs", path: "/utilisateurs" },
        { label: "Comptes", path: "/comptes" },
        { label: "Roles", path: "/roles" },
        { label: "Priviliges", path: "/priviliges" },
      ],
    },
  ];
  return (
    <>
      <header className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link className="w-full h-full" to="/">
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
        {/* menuItemsLeft */}
        {menuItemsLeft.map((item, index) =>
          item.subItems ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
                >
                  {item.label}{" "}
                  {item.subItems && <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#003049] text-white">
                <DropdownMenuGroup>
                  {item.subItems &&
                    item.subItems.map((subItem, i) => (
                      <DropdownMenuItem key={i}>
                        <Link className="w-full" to={subItem.path}>
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Link className="w-full h-full" to={item.path}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
                  >
                    {item.label}
                  </Button>
                </Link>
              </DropdownMenuTrigger>
            </DropdownMenu>
          )
        )}

        {/* menuItemsRight */}
        {menuItemsRight.map((item, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-transparent border-none text-left hover:bg-sky-600 p-4"
              >
                {item.label} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#003049] text-white">
              <DropdownMenuGroup>
                {item.subItems &&
                  item.subItems.map((subItem, i) => (
                    <DropdownMenuItem key={i}>
                      <Link className="w-full" to={subItem.path}>
                        {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center bg-[#003049] text-white">
        <div className="flex items-center space-x-4">
          {/* menuItemsLeft */}
          {menuItemsLeft.map((item, index) =>
            item.subItems ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
                  >
                    {item.label}{" "}
                    {item.subItems && <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#003049] text-white">
                  <DropdownMenuGroup>
                    {item.subItems &&
                      item.subItems.map((subItem, i) => (
                        <DropdownMenuItem key={i}>
                          <Link className="w-full" to={subItem.path}>
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Link className="w-full h-full" to={item.path}>
                    <Button
                      variant="outline"
                      className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
                    >
                      {item.label}
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
              </DropdownMenu>
            )
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* menuItemsRight */}
          {menuItemsRight.map((item, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-none hover:bg-sky-600 p-4 h-full hover:text-white"
                >
                  {item.label} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#003049] text-white">
                <DropdownMenuGroup>
                  {item.subItems &&
                    item.subItems.map((subItem, i) => (
                      <DropdownMenuItem key={i}>
                        <Link className="w-full" to={subItem.path}>
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Header;
