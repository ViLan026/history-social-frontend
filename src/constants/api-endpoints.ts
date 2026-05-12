
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },

  USERS: {
      BASE: '/users',
      GET_BY_ID: (id: string) => `/users/${id}`,
      UPDATE: (id: string) => `/users/${id}`,
      CHANGE_PASSWORD: (id: string) => `/users/${id}/password`,
      LOCK: (id: string) => `/users/${id}/lock`,
      UNLOCK: (id: string) => `/users/${id}/unlock`,
      // Endpoint dưới đây của bạn đang nằm trong auth.users
      ME: '/users/me', 
      PROFILE: (id: string) => `/users/${id}`,
      FOLLOW: (id: string) => `/users/${id}/follow`,
    },
    
    ROLES: {
      BASE: '/roles',
      GET_BY_ID: (id: string) => `/roles/${id}`,
      UPDATE: (id: string) => `/roles/${id}`,
    },

  POSTS: {
    BASE: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    GET_BY_AUTHOR: (authorId: string) => `/posts/author/${authorId}`,
    SEARCH: '/posts/search',
    FEED: '/feed',
  },

  BOOKMARKS: {
    BASE: '/bookmarks',
    TOGGLE: (postId: string) => `/bookmarks/${postId}`,
    CHECK: (postId: string) => `/bookmarks/check/${postId}`,
    COUNT: '/bookmarks/count',
  },

  COMMENTS: {
    BASE: '/comments',
    GET_BY_POST: (postId: string) => `/comments/posts/${postId}`,
    DELETE: (commentId: string) => `/comments/${commentId}`,
  },

  REACTIONS: {
      BASE: '/reactions',
      GET_STATS: (postId: string) => `/reactions/posts/${postId}/stats`,
      GET_DETAILS: (postId: string) => `/reactions/posts/${postId}`,
    },

    ON_THIS_DAY: {
        // BASE: '/onthisday',
        TODAY: '/onthisday/today',
        BY_DATE: '/onthisday/by-date',
      },


};