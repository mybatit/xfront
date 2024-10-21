export interface Account {
  id: number;
  name: string;
  description: string | null;
  parent: number;
  creator: number;
  pilot: number;
  code_objects_id: number;
  code_synchronisation_id: number;
  deleted_at: string | null;
  deleted: number;
  deleted_by: number;
  created_by: number | null;
  restored: number;
  restored_by: number;
  created_at: string;
  updated_at: string;
  pilot_name: string | null;
}
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
  export interface ReservationsType {
    form_id: number;
    id: number;
    created_at: string; // ou Date si vous préférez manipuler des objets Date
    updated_at: string; // ou Date
    name: string;
    description: string;
    account_id: number;
    created_by: number;
    deleted_at: string | null; // ou Date | null si vous préférez Date
    deleted: number;
    deleted_by: number | null;
    restored_at: string | null; // ou Date | null
    restored: number;
    restored_by: number | null;
    code_objects: string;
    code_synchronisations: string;
    code_unique_id: number;
    account_name: string;
  }
  export interface User {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    account_name: string;
    description: string | null;
    email: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    created_by: number;
    account_id: number;
    current_team_id: number | null;
    profile_photo_path: string | null;
    created_at: string;
    updated_at: string;
    role_id: number;
    code_unique_id: number;
    deleted_at: string | null;
    deleted: number;
    deleted_by: number | null;
    restored_at: string | null;
    restored_: number;
    restored_by: number | null;
    code_objects: string;
    code_synchronisations: string;
    profile_photo_url: string;
  }
  

  export interface Vehicules {
    id: number;
    brand: string;
    model: string;
    matricule: string;
    year: number | null;
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