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
interface TypesReservation {
  form_id: number;
  id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  name: string;
  description: string;
  account_id: number;
  created_by: number;
  code_objects_id: number;
  code_synchronisations_id: number;
  deleted_at: string | null;
  deleted: number;
  deleted_by: number | null;
  restored_at: string | null;
  restored: number;
  restored_by: number | null;
  promote: string | null;
  pro: string | null;
}

const columns: ColumnDef<TypesReservation>[] = [
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
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
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
      return convertDateFormat(dateStr); // Convert date to preferred format
    },
  },
  {
    accessorKey: "account_id",
    header: "ID du Compte",
  },
  {
    accessorKey: "created_by",
    header: "Créé par",
  },
  {
    accessorKey: "code_objects_id",
    header: "Code Objects ID",
  },
  {
    accessorKey: "code_synchronisations_id",
    header: "Code Synchronisations ID",
  },
  {
    accessorKey: "deleted",
    header: "Supprimé",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"), // Display "Oui" for deleted, "Non" otherwise
  },
  {
    accessorKey: "restored",
    header: "Restauré",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"), // Display "Oui" for restored, "Non" otherwise
  },
  {
    accessorKey: "promote",
    header: "Promote",
    cell: ({ getValue }) => (getValue() === "null" ? "Non" : getValue()), // Show "Non" if null
  },
  {
    accessorKey: "pro",
    header: "Pro",
    cell: ({ getValue }) => (getValue() === null ? "Non" : getValue()), // Show "Non" if null
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;

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
              onClick={() => navigator.clipboard.writeText(reservation.name)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copier le nom
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

const TypesDesReservationsPage = () => {
  const [typesDesReservations, setTypesDesReservations] = useState<
    TypesReservation[]
  >([]);
  // // const [error, setError] = useState<string | null>(null);
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
        // console.log("Decoded Token:", decodedToken);
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
  // console.log(token);
  console.log(decodedToken);
  console.log(loading);

  useEffect(() => {
    setLoading(true);

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
          console.log("response: ", response);
          throw new Error("Failed to fetch typesDesReservations");
        }

        const data = await response.json();
        console.log("data: ", data);
        console.log("data.reservations_types: ", data.reservations_types);
        // console.log("data.$reservations_types: ", data.$reservations_types);

        if (data.reservations_types) {
          setTypesDesReservations(data.reservations_types); // Update state with fetched data
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching typesDesReservations:", error);
        setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);

  console.log("Types Des Reservations :", typesDesReservations);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Pagination state
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // Start at the first page
    pageSize: 8, // Default page size
  });

  const table = useReactTable({
    data: typesDesReservations,
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

          <h3 className="font-bold mb-2">Recherche type de reservation</h3>
          <Input
            placeholder="Rechercher par nom..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="mb-2 bg-white"
          />
          <Button className="w-full mb-2 bg-sky-500 hover:bg-sky-600">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
          <Button className="w-full" variant="outline">
            Nouveau
          </Button>

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
                <Users className="mr-2" /> Types des réservations
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
                      Aucun utilisateur trouvé.
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
};

export default TypesDesReservationsPage;
