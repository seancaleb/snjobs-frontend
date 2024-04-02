import { Role } from "@/features/account";

export type Token = {
  accessToken: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: Exclude<Role, "admin">;
}
