
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
  posts: {
    create: '/posts',
    get: (id: string) => `/posts/${id}`,
    update: (id: string) => `/posts/${id}`,
    delete: (id: string) => `/posts/${id}`,
    search: '/posts/search',
  },
};