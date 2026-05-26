
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
      LOCK: (id: string) => `/admin/users/${id}/lock`,
      UNLOCK: (id: string) => `/admin/users/${id}/unlock`,
      ME: '/users/me', 
    },

    ADMIN_DASHBOARD: {
      OVERVIEW: '/admin/dashboard/overview',
      POST_STATUS_STATS: '/admin/dashboard/post-status-stats',
      REPORT_STATUS_STATS: '/admin/dashboard/report-status-stats',
      REPORT_REASON_STATS: '/admin/dashboard/report-reason-stats',
      NEW_USERS: '/admin/dashboard/new-users',
      NEW_POSTS: '/admin/dashboard/new-posts',
      ENGAGEMENT_STATS: '/admin/dashboard/engagement-stats',
      TOP_REPORTED_POSTS: '/admin/dashboard/top-reported-posts',
      LATEST_PENDING_REPORTS: '/admin/dashboard/latest-pending-reports',
      TOP_TAGS: '/admin/dashboard/top-tags',
      REACTION_STATS: '/admin/dashboard/reaction-stats',
    },
    
    ROLES: {
      BASE: '/roles',
      GET_BY_ID: (id: string) => `/roles/${id}`,
      UPDATE: (id: string) => `/roles/${id}`,
    },

  POSTS: {
    BASE: '/posts',
    HOME: '/posts/home',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    UPDATE: (id: string) => `/posts/${id}`,       // Trùng URL với GET nhưng khác Method (PUT)
    GET_BY_AUTHOR: (authorId: string) => `/posts/author/${authorId}`,
    SEARCH: '/posts/search',
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

    FOLLOW: {
      BASE: '/follows',
      FOLLOW_USER: (userId: string) => `/follows/${userId}`,
      UNFOLLOW_USER: (userId: string) => `/follows/${userId}`,
      GET_FOLLOWERS: (userId: string) => `/follows/${userId}/followers`,
      GET_FOLLOWING: (userId: string) => `/follows/${userId}/following`,
      GET_SUGGESTIONS: '/follows/suggestions',
    },
    
    REPORTS: {
      BASE: '/reports',
      ME: '/reports/me',
    },

    ADMIN_REPORTS: {
        PENDING: '/admin/reports/pending',
        REVIEW: (id: string) => `/admin/reports/${id}/review`,
    },

    ADMIN_ON_THIS_DAY: {
      ADMIN_GET_ALL: '/admin/onthisday/days',
      ADMIN_CREATE: '/admin/onthisday',
      ADMIN_UPDATE: (id: string) => `/admin/onthisday/${id}`,
      ADMIN_DELETE: (id: string) => `/admin/onthisday/${id}`,
    }


};