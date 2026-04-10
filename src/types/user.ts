// src/types/user.ts
import { PageResponse } from './api';

// Định nghĩa chung (nếu chưa có)
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