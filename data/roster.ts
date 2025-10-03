
export interface Explorer {
  id: string;
  name: string;
  rank: string;
  joinDate: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: 'active' | 'inactive' | 'probationary';
  avatar?: string;
  isSpecialRank?: boolean;
  communityServiceHours?: number;
  detailsAttended?: number;
  meetingsAttended?: number;
  totalMeetings?: number;
  certifications?: string[];
  canEditCalendar?: boolean;
  canEditRoster?: boolean;
  isAdvisor?: boolean;
}

// Helper function to check if rank is special
export const isSpecialRank = (rank: string): boolean => {
  const specialRanks = ['Officer', 'Major', 'Captain', 'Lieutenant', 'Sgt', 'Advisor'];
  return specialRanks.some(specialRank => rank.toLowerCase().includes(specialRank.toLowerCase()));
};

// Helper function to check if user can edit calendar/roster
export const canEditContent = (rank: string): boolean => {
  const editableRanks = ['Major', 'Captain', 'Lieutenant', 'Sgt', 'Advisor'];
  return editableRanks.some(editRank => rank.toLowerCase().includes(editRank.toLowerCase()));
};

// Helper function to check if user is advisor
export const isAdvisor = (rank: string): boolean => {
  return rank.toLowerCase().includes('advisor');
};

export const roster: Explorer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rank: 'Explorer Captain',
    joinDate: '2020-08-15',
    email: 'sarah.johnson@daytonabeachpd.gov',
    phone: '(386) 555-0123',
    emergencyContact: 'Mary Johnson (Mother)',
    emergencyPhone: '(386) 555-0124',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 245,
    detailsAttended: 18,
    meetingsAttended: 22,
    totalMeetings: 24,
    certifications: ['First Aid', 'CPR', 'Traffic Control', 'Leadership'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: false,
  },
  {
    id: '2',
    name: 'Michael Chen',
    rank: 'Explorer Lieutenant',
    joinDate: '2021-01-20',
    email: 'michael.chen@daytonabeachpd.gov',
    phone: '(386) 555-0125',
    emergencyContact: 'David Chen (Father)',
    emergencyPhone: '(386) 555-0126',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 189,
    detailsAttended: 15,
    meetingsAttended: 20,
    totalMeetings: 22,
    certifications: ['First Aid', 'CPR', 'Traffic Control'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: false,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rank: 'Explorer Major',
    joinDate: '2019-09-10',
    email: 'emily.rodriguez@daytonabeachpd.gov',
    phone: '(386) 555-0127',
    emergencyContact: 'Carlos Rodriguez (Father)',
    emergencyPhone: '(386) 555-0128',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 312,
    detailsAttended: 25,
    meetingsAttended: 28,
    totalMeetings: 30,
    certifications: ['First Aid', 'CPR', 'Traffic Control', 'Leadership', 'Emergency Response'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: false,
  },
  {
    id: '4',
    name: 'Officer James Wilson',
    rank: 'Advisor',
    joinDate: '2018-03-05',
    email: 'james.wilson@daytonabeachpd.gov',
    phone: '(386) 555-0129',
    emergencyContact: 'Lisa Wilson (Mother)',
    emergencyPhone: '(386) 555-0130',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 450,
    detailsAttended: 35,
    meetingsAttended: 35,
    totalMeetings: 35,
    certifications: ['All Certifications', 'Police Academy Graduate'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: true,
  },
  {
    id: '5',
    name: 'Ashley Thompson',
    rank: 'Explorer Sergeant',
    joinDate: '2021-11-12',
    email: 'ashley.thompson@daytonabeachpd.gov',
    phone: '(386) 555-0131',
    emergencyContact: 'Robert Thompson (Father)',
    emergencyPhone: '(386) 555-0132',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 167,
    detailsAttended: 12,
    meetingsAttended: 18,
    totalMeetings: 20,
    certifications: ['First Aid', 'CPR', 'Traffic Control'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: false,
  },
  {
    id: '6',
    name: 'Officer David Martinez',
    rank: 'Advisor',
    joinDate: '2017-05-18',
    email: 'david.martinez@daytonabeachpd.gov',
    phone: '(386) 555-0133',
    emergencyContact: 'Maria Martinez (Wife)',
    emergencyPhone: '(386) 555-0134',
    status: 'active',
    isSpecialRank: true,
    communityServiceHours: 520,
    detailsAttended: 42,
    meetingsAttended: 40,
    totalMeetings: 40,
    certifications: ['All Certifications', 'Police Academy Graduate', 'Instructor'],
    canEditCalendar: true,
    canEditRoster: true,
    isAdvisor: true,
  },
  {
    id: '7',
    name: 'Jessica Brown',
    rank: 'Explorer Corporal',
    joinDate: '2022-08-15',
    email: 'jessica.brown@email.com',
    phone: '(386) 555-0135',
    emergencyContact: 'Mark Brown (Father)',
    emergencyPhone: '(386) 555-0136',
    status: 'active',
    isSpecialRank: false,
    communityServiceHours: 89,
    detailsAttended: 8,
    meetingsAttended: 14,
    totalMeetings: 16,
    certifications: ['First Aid', 'CPR'],
    canEditCalendar: false,
    canEditRoster: false,
    isAdvisor: false,
  },
  {
    id: '8',
    name: 'Ryan Davis',
    rank: 'Explorer',
    joinDate: '2023-01-20',
    email: 'ryan.davis@email.com',
    phone: '(386) 555-0137',
    emergencyContact: 'Jennifer Davis (Mother)',
    emergencyPhone: '(386) 555-0138',
    status: 'probationary',
    isSpecialRank: false,
    communityServiceHours: 25,
    detailsAttended: 2,
    meetingsAttended: 8,
    totalMeetings: 12,
    certifications: ['First Aid'],
    canEditCalendar: false,
    canEditRoster: false,
    isAdvisor: false,
  },
  {
    id: '9',
    name: 'Amanda Garcia',
    rank: 'Explorer',
    joinDate: '2023-03-10',
    email: 'amanda.garcia@email.com',
    phone: '(386) 555-0139',
    emergencyContact: 'Luis Garcia (Father)',
    emergencyPhone: '(386) 555-0140',
    status: 'active',
    isSpecialRank: false,
    communityServiceHours: 45,
    detailsAttended: 4,
    meetingsAttended: 10,
    totalMeetings: 12,
    certifications: ['First Aid'],
    canEditCalendar: false,
    canEditRoster: false,
    isAdvisor: false,
  },
  {
    id: '10',
    name: 'Tyler Johnson',
    rank: 'Explorer',
    joinDate: '2022-06-15',
    email: 'tyler.johnson@email.com',
    phone: '(386) 555-0141',
    emergencyContact: 'Patricia Johnson (Mother)',
    emergencyPhone: '(386) 555-0142',
    status: 'active',
    isSpecialRank: false,
    communityServiceHours: 78,
    detailsAttended: 6,
    meetingsAttended: 12,
    totalMeetings: 14,
    certifications: ['First Aid', 'CPR'],
    canEditCalendar: false,
    canEditRoster: false,
    isAdvisor: false,
  },
];
