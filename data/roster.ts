
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
}

export const roster: Explorer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rank: 'Senior Explorer',
    joinDate: '2022-08-15',
    email: 'sarah.johnson@email.com',
    phone: '(386) 555-0123',
    emergencyContact: 'Mary Johnson (Mother)',
    emergencyPhone: '(386) 555-0124',
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rank: 'Explorer',
    joinDate: '2023-01-20',
    email: 'michael.chen@email.com',
    phone: '(386) 555-0125',
    emergencyContact: 'David Chen (Father)',
    emergencyPhone: '(386) 555-0126',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rank: 'Explorer Captain',
    joinDate: '2021-09-10',
    email: 'emily.rodriguez@email.com',
    phone: '(386) 555-0127',
    emergencyContact: 'Carlos Rodriguez (Father)',
    emergencyPhone: '(386) 555-0128',
    status: 'active',
  },
  {
    id: '4',
    name: 'James Wilson',
    rank: 'Explorer',
    joinDate: '2023-03-05',
    email: 'james.wilson@email.com',
    phone: '(386) 555-0129',
    emergencyContact: 'Lisa Wilson (Mother)',
    emergencyPhone: '(386) 555-0130',
    status: 'probationary',
  },
  {
    id: '5',
    name: 'Ashley Thompson',
    rank: 'Senior Explorer',
    joinDate: '2022-11-12',
    email: 'ashley.thompson@email.com',
    phone: '(386) 555-0131',
    emergencyContact: 'Robert Thompson (Father)',
    emergencyPhone: '(386) 555-0132',
    status: 'active',
  },
  {
    id: '6',
    name: 'David Martinez',
    rank: 'Explorer',
    joinDate: '2023-05-18',
    email: 'david.martinez@email.com',
    phone: '(386) 555-0133',
    emergencyContact: 'Maria Martinez (Mother)',
    emergencyPhone: '(386) 555-0134',
    status: 'active',
  },
];
