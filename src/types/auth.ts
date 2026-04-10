// src/types/auth.ts

export interface RoleResponse {
  name: string;
  description: string;
  createdAt: string;
}

export interface ProfileResponse {
  userId: string;
  displayName: string | null;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface UserResponse {
  id: string; 
  email: string;
  status: string; 
  roles: RoleResponse[];
  profile: ProfileResponse;
  createdAt: string; 
  updatedAt: string; 
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
  refreshToken: string;
  accessToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface IntrospectRequest {
  token: string;
}

export interface IntrospectResponse {
  valid: boolean;
}

export interface RefreshRequest {
  refreshToken: string;
}

