import { Copy, Eye, NotebookPen, Search, Trash2 } from "lucide-react";
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
const tableId = "reservations";

// Utility function for date formatting
const convertDateFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface Reservations {
  id: number;
  matricule: string;
  description: string;
  reservationsstatuses_id: number;
  reservationstypes_id: number;
  account_id: number;
  date_creation: string; // ISO date string
  date_submit: string | null;
  date_validation: string | null;
  date_solde: string | null;
  created_by: number;
  code_objects_id: number | null;
  code_synchronisations_id: number | null;
  deleted_at: string | null;
  deleted: number;
  deleted_by: number | null;
  restored_at: string | null;
  restored: number;
  restored_by: number | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  vehicle_id: number;
  date_start: string; // ISO date string
  date_end: string; // ISO date string
  code_objects: string;
  code_synchronisations: string;
  name: string | null;
  status: string;
  code_unique_id: number;
  account_name: string;
  before_date_start: string | null;
  after_date_end: string | null;
  vehiclesdisponibilities_id: number | null;
  usersdisponibilities_id: number | null;
  pickup: string | null;
  dropoff: string | null;
}

const columns: ColumnDef<Reservations>[] = [
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
    accessorKey: "matricule",
    header: "Matricule",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date_creation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date de Création
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      return convertDateFormat(dateStr); // Assuming convertDateFormat is defined
    },
  },
  {
    accessorKey: "account_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom du compte
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
  },
  {
    accessorKey: "date_start",
    header: "Date de Début",
  },
  {
    accessorKey: "date_end",
    header: "Date de Fin",
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
              onClick={() =>
                navigator.clipboard.writeText(reservation.matricule)
              }
            >
              <Copy className="mr-2 h-4 w-4" />
              Copier le matricule
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <Link to={`/reservations/details/${reservation.id}`}>
                Voir les détails
              </Link>
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

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservations[]>([]);
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
    // setLoading(false); // Set loading to false after checking token
  }, [navigate]);
  // console.log(token);
  console.log(decodedToken);
  console.log(loading);

  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchreservations = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.my_items) {
          setReservations(data.my_items); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // setError("Failed to load reservations. Please try again later.");
        // setLoading(false);
      }
    };

    fetchreservations();
  }, [token]);

  console.log("reservations :", reservations);

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
    data: reservations,
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
          <h3 className="font-bold mb-2">Recherche Reservation</h3>
          <Input
            placeholder="Rechercher par e-mails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="mb-2 bg-white"
          />
          <Button className="w-full mb-2 bg-sky-500 hover:bg-sky-600">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
          <Link to="/reservations/create">
            <Button className="w-full mb-2" variant="outline">
              Nouveau
            </Button>
          </Link>
          <Link to="/reservations/planifier">
            <Button className="w-full" variant="outline">
              planifier
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
                <NotebookPen className="mr-2" /> Reservations
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
                      className="h-24 text-center"
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
                      Aucun Reservation trouvé.
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

export default ReservationsPage;
