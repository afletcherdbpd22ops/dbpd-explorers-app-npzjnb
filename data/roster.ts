
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
  isSpecialRank?: boolean; // New field to identify special ranks
}

// Helper function to check if rank is special
export const isSpecialRank = (rank: string): boolean => {
  const specialRanks = ['Officer', 'Major', 'Captain', 'Lieutenant', 'Sgt', 'Advisor'];
  return specialRanks.some(specialRank => rank.toLowerCase().includes(specialRank.toLowerCase()));
};

export const roster: Explorer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rank: 'Captain',
    joinDate: '2020-08-15',
    email: 'sarah.johnson@daytonabeachpd.gov',
    phone: '(386) 555-0123',
    emergencyContact: 'Mary Johnson (Mother)',
    emergencyPhone: '(386) 555-0124',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    rank: 'Lieutenant',
    joinDate: '2021-01-20',
    email: 'michael.chen@daytonabeachpd.gov',
    phone: '(386) 555-0125',
    emergencyContact: 'David Chen (Father)',
    emergencyPhone: '(386) 555-0126',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rank: 'Major',
    joinDate: '2019-09-10',
    email: 'emily.rodriguez@daytonabeachpd.gov',
    phone: '(386) 555-0127',
    emergencyContact: 'Carlos Rodriguez (Father)',
    emergencyPhone: '(386) 555-0128',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '4',
    name: 'James Wilson',
    rank: 'Officer',
    joinDate: '2022-03-05',
    email: 'james.wilson@daytonabeachpd.gov',
    phone: '(386) 555-0129',
    emergencyContact: 'Lisa Wilson (Mother)',
    emergencyPhone: '(386) 555-0130',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '5',
    name: 'Ashley Thompson',
    rank: 'Sgt',
    joinDate: '2021-11-12',
    email: 'ashley.thompson@daytonabeachpd.gov',
    phone: '(386) 555-0131',
    emergencyContact: 'Robert Thompson (Father)',
    emergencyPhone: '(386) 555-0132',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '6',
    name: 'David Martinez',
    rank: 'Advisor',
    joinDate: '2020-05-18',
    email: 'david.martinez@daytonabeachpd.gov',
    phone: '(386) 555-0133',
    emergencyContact: 'Maria Martinez (Mother)',
    emergencyPhone: '(386) 555-0134',
    status: 'active',
    isSpecialRank: true,
  },
  {
    id: '7',
    name: 'Jessica Brown',
    rank: 'Senior Explorer',
    joinDate: '2022-08-15',
    email: 'jessica.brown@email.com',
    phone: '(386) 555-0135',
    emergencyContact: 'Mark Brown (Father)',
    emergencyPhone: '(386) 555-0136',
    status: 'active',
    isSpecialRank: false,
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
  },
  {
    id: '10',
    name: 'Tyler Johnson',
    rank: 'Senior Explorer',
    joinDate: '2022-06-15',
    email: 'tyler.johnson@email.com',
    phone: '(386) 555-0141',
    emergencyContact: 'Patricia Johnson (Mother)',
    emergencyPhone: '(386) 555-0142',
    status: 'active',
    isSpecialRank: false,
  },
];
