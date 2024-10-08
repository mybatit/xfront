export interface Reservations {
    id: number;
    id_matricule: string;
    description: string | null;
    reservationsstatuses_id: number;
    reservationstypes_id: number;
    account_id: number;
    date_creation: string;
    date_submit: string | null;
    date_validation: string | null;
    date_solde: string | null;
    created_by: number;
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
    vehicle_id: number;
  };

  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    user_creator: number;
    account_id: number;
    current_team_id: number | null;
    profile_photo_path: string | null;
    created_at: string;
    updated_at: string;
    id_code_objects: number;
    id_code_synchronisation: number;
    deleted_at: string | null;
    deleted: number;
    deleted_by: string | null;
    restored_at: string | null;
    restored_: number;
    restored_by: string | null;
    profile_photo_url: string;
  };

  export interface Vehicules {
    id: number;
    brand: string;
    model: string;
    matricule: string;
    year: number | null;  // 'year' peut être un nombre ou null
    color: string | null;  // 'color' peut être une chaîne ou null
    vin: string;
    mileage: number | null;  // 'mileage' peut être un nombre ou null
    price: number | null;  // 'price' peut être un nombre ou null
    description: string | null;  // 'description' peut être une chaîne ou null
    created_by: number;
    account_id: number;
    code_objects_id: number;
    code_synchronisation_id: number;
    deleted_at: string | null;  // 'deleted_at' peut être une chaîne ou null
    deleted: number;
    deleted_by: number | null;  // 'deleted_by' peut être un nombre ou null
    restored_at: string | null;  // 'restored_at' peut être une chaîne ou null
    restored: number;
    restored_by: number | null;  // 'restored_by' peut être un nombre ou null
    created_at: string;  // En supposant que c'est une chaîne au format ISO
    updated_at: string;  // En supposant que c'est une chaîne au format ISO
  }

  // Define pagination state shapes
export type PaginationState = {
    pageIndex: number;
    pageSize: number;
  };
  
  export type PaginationTableState = {
    pagination: PaginationState;
  };
  
  export type PaginationInitialTableState = {
    pagination?: Partial<PaginationState>;
  };