import { Copy, Eye, Search, Trash2, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// ================================================================================
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/ui/Elements/Loader";
import { PaginationState } from "@/types/types";
import { Link } from "react-router-dom";

// Utiliser un identifiant unique pour chaque table
const tableId = "vehiculesAvecReservations";
function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);

  // Récupérer les différentes parties de la date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const year = date.getFullYear();

  // Récupérer l'heure et les minutes
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Retourner le format souhaité
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  matricule: string;
  year: string | null;
  color: string | null;
  vin: string;
  mileage: number | null;
  price: number | null;
  description: string | null;
  created_by: number;
  account_id: number;
  code_objects_id: number;
  code_synchronisation_id: number;
  deleted_at: string | null;
  deleted: number;
  deleted_by: number | null;
  restored_at: string | null;
  restored: number;
  restored_by: number | null;
  created_at: string;
  updated_at: string;
}

interface BookingPeriod {
  date_start: string;
  date_end: string;
}

interface VehiculesAvecReservations {
  vehicle: Vehicle;
  booking_periods: BookingPeriod[];
}

const columns: ColumnDef<VehiculesAvecReservations>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicle.brand",
    header: "Brand",
  },
  {
    accessorKey: "vehicle.model",
    header: "Model",
  },
  {
    accessorKey: "vehicle.matricule",
    header: "Matricule",
  },
  {
    accessorKey: "vehicle.vin",
    header: "VIN",
  },
  {
    accessorKey: "booking_periods[0].date_start",
    header: "Booking Start Date",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      return convertDateFormat(dateStr); // You can format this as needed
    },
  },
  {
    accessorKey: "booking_periods[0].date_end",
    header: "Booking End Date",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      return convertDateFormat(dateStr); // You can format this as needed
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Créé_à
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      return convertDateFormat(dateStr);
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original.vehicle;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={
                () => navigator.clipboard.writeText(vehicle.vin)
              }
            >
              <Copy className="mr-2 h-4 w-4" />
              Copier VIN
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function VehiculesAvecReservations() {
  const [vehiculesAvecReservations, setVehiculesAvecReservations] = useState<VehiculesAvecReservations[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [decodedToken, setDecodedToken] = useState(null);
  const [token, settoken] = useState(""); // Add loading state

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        settoken(token);
        // Deserialize the JWT token
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Set user information based on decoded token
        console.log("Decoded Token:", decodedToken);
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

  console.log("data user Decoded", decodedToken);
  // console.log("token", token);
  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchusers = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/vehicles-with-Bookings`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehiculesAvecReservations");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.vehicles) {
          setVehiculesAvecReservations(data.vehicles); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching vehiculesAvecReservations:", error);
        // setError("Failed to load vehiculesAvecReservations. Please try again later.");
        setLoading(false);
      }
    };

    fetchusers();
  }, [token]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Récupérer les champs sélectionnés de localStorage lors du chargement
  useEffect(() => {
    const savedVisibility = localStorage.getItem(`columnVisibility-${tableId}`);
    if (savedVisibility) {
      setColumnVisibility(JSON.parse(savedVisibility));
    }
  }, []);

  // Enregistrer les boîtes sélectionnées dans localStorage une fois modifiées
  useEffect(() => {
    localStorage.setItem(
      `columnVisibility-${tableId}`,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);
  // Pagination state
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // Start at the first page
    pageSize: 8, // Default page size
  });

  const table = useReactTable({
    data: vehiculesAvecReservations,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination, // Handle pagination changes
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination, // Include pagination state
    },
  });

  return (
    <div className="flex flex-col ">
      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* aside */}
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          {/* <h2 className="text-lg font-semibold mb-2">Agence</h2>

          <Button variant="outline" className="text-black mb-2 w-full">
            <span className="ml-2">Efficient Technology</span>
            <GitFork className="ml-2 h-5 w-5" />
          </Button>

          <div>
            <h3 className="mb-2 font-medium">Géolocalisation</h3>
            <Select>
              <SelectTrigger className="w-full mb-2 bg-white">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <h3 className="font-bold mb-2">Recherche vehicules avec reservation</h3>
          <Input
            placeholder="Rechercher par marque..."
            value={(table.getColumn("brand")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("brand")?.setFilterValue(event.target.value)
            }
            className="mb-2 bg-white"
          />
          <Button className="w-full mb-2 bg-sky-500 hover:bg-sky-600">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
          <Link to="/vehicules-avec-reservations/create">
          <Button className="w-full" variant="outline">
            Nouveau
          </Button>
          </Link>

          <div>
            <h3 className="mb-2 font-medium">Export</h3>
            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              Exporter
            </Button>
          </div>
        </aside>

        {/* Main */}
        <main className="w-full flex-1 p-4">
          <div className="flex flex-col lg:flex-row items-center py-2">
            <header className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="mr-2" /> Vehicules avec reservations
              </h1>
            </header>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const columnLabel =
                      column.id === "name"
                        ? "Nom"
                        : column.id === "created_at"
                        ? "Créé_à"
                        : column.id === "account_name"
                        ? "Nom du compte"
                        : column.id;

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {columnLabel}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 flex items-center justify-center"
                    >
                      <Loader />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Aucun Vehicules avec reservation trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// {user.profile_photo_url === "" ? (
//   <span>No Photo</span>
// ) : (
//   <img
//     src={user.profile_photo_url}
//     alt={user.name}
//     className="w-6 h-6 rounded-full"
//   />
// )}





