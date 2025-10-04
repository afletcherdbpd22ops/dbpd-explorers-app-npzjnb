
export interface User {
  id: string;
  email: string;
  explorerId?: string;
  role: 'explorer' | 'advisor' | 'admin';
  permissions: {
    canEditCalendar: boolean;
    canEditRoster: boolean;
    canViewApplications: boolean;
    canApproveApplications: boolean;
    canEditLogo: boolean;
  };
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Mock current user - in a real app this would come from authentication
export const currentUser: User = {
  id: 'user3',
  email: 'emily.rodriguez@daytonabeachpd.gov',
  explorerId: '3', // Emily Rodriguez - Explorer Major
  role: 'explorer',
  permissions: {
    canEditCalendar: true,
    canEditRoster: true,
    canViewApplications: true,
    canApproveApplications: true,
    canEditLogo: false,
  },
};

// Authentication functions
export const getAuthState = (): AuthState => {
  return {
    isAuthenticated: true, // Always authenticated for now
    user: currentUser,
  };
};

export const setAuthState = (isAuthenticated: boolean) => {
  console.log('Auth state changed:', isAuthenticated);
};

export const signOut = () => {
  console.log('User signed out');
};

// Function to check permissions based on rank
export const getUserPermissions = (rank: string): User['permissions'] => {
  var isAdvisorRank = rank.toLowerCase().includes('advisor');
  var canEdit = ['major', 'captain', 'lieutenant', 'sergeant', 'sgt', 'advisor'].some(
    r => rank.toLowerCase().includes(r)
  );
  var canApprove = ['major', 'captain', 'advisor'].some(
    r => rank.toLowerCase().includes(r)
  );

  return {
    canEditCalendar: canEdit,
    canEditRoster: canEdit,
    canViewApplications: canApprove,
    canApproveApplications: canApprove,
    canEditLogo: isAdvisorRank,
  };
};
