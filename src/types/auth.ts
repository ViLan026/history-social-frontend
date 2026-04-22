// src/types/auth.ts

export interface RoleResponse {
  name: string;
  description: string;
  createdAt: string;
}

export interface UserCreationRequest {
  email: string;
  password?: string;
}

export interface AuthenticationRequest {
  email: string;
  password?: string;
}

export interface AuthenticationResponse {
  authenticated: boolean;
}

export interface LogoutRequest {}

export interface IntrospectRequest {}

export interface IntrospectResponse {
  valid: boolean;
  message?: string;
}

export interface RefreshRequest {}

