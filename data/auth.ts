
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

// Function to check permissions based on rank
export const getUserPermissions = (rank: string): User['permissions'] => {
  const isAdvisorRank = rank.toLowerCase().includes('advisor');
  const canEdit = ['major', 'captain', 'lieutenant', 'sergeant', 'sgt', 'advisor'].some(
    r => rank.toLowerCase().includes(r)
  );
  const canApprove = ['major', 'captain', 'advisor'].some(
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
