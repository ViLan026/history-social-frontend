// src/types/user.ts
import { PageResponse } from '../../types/api';


export type AccountStatus = 'ACTIVE' | 'INACTIVE' | string;

export interface RoleCreationRequest {
  name: string;
  description?: string;
}

export interface RoleUpdateRequest {
  description?: string;
}

export interface RoleResponse {
  name: string;
  description: string;
  createdAt: string; // ISO String
}

export interface Role {
  name: string;
  description?: string;
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
  status: string; // AccountStatus enum
  roles: RoleResponse[];
  profile: ProfileResponse;
  createdAt: string;
  updatedAt: string;
}

// Request DTOs
export interface UserUpdateRequest {
  displayName?: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserCreationRequest {
  email: string;
  password?: string;
}

// Response DTOs
export interface UserSummaryResponse {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  status: string;
  roles: any[]; // Map theo Set<Role> của backend
}

// Params cho GET /users
export interface GetUsersParams {
  page?: number;
  size?: number;
  keyword?: string;
}

export interface UserReactionResponse {
  id: string;
  displayName: string;
  avatarUrl: string;
}