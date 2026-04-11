
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    me: '/users/me',
    profile: (id: string) => `/users/${id}`,
    follow: (id: string) => `/users/${id}/follow`,
  },
  POSTS: {
    BASE: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    GET_BY_AUTHOR: (authorId: string) => `/posts/author/${authorId}`,
    SEARCH: '/posts/search',
  },
};