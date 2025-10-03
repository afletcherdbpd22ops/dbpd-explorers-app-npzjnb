
export interface CommunityServiceRecord {
  id: string;
  explorerId: string;
  eventName: string;
  organization: string;
  date: string;
  hoursServed: number;
  description: string;
  location: string;
  supervisorName?: string;
  supervisorContact?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
}

export interface CommunityServiceEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  maxParticipants?: number;
  currentParticipants: string[]; // Explorer IDs
  supervisorName: string;
  supervisorContact: string;
  hoursOffered: number;
  requirements?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export const communityServiceRecords: CommunityServiceRecord[] = [
  {
    id: 'cs-1',
    explorerId: '1',
    eventName: 'Beach Cleanup Initiative',
    organization: 'Daytona Beach Environmental Group',
    date: '2024-01-15',
    hoursServed: 4,
    description: 'Participated in beach cleanup removing trash and debris from Daytona Beach shoreline',
    location: 'Daytona Beach Main Street Pier',
    supervisorName: 'Jennifer Martinez',
    supervisorContact: 'jennifer.martinez@dbeg.org',
    status: 'approved',
    approvedBy: 'Officer James Wilson',
    approvedDate: '2024-01-16',
  },
  {
    id: 'cs-2',
    explorerId: '1',
    eventName: 'Food Bank Volunteer',
    organization: 'Halifax Urban Ministries',
    date: '2024-01-22',
    hoursServed: 6,
    description: 'Sorted and packaged food donations for distribution to families in need',
    location: 'Halifax Urban Ministries Food Bank',
    supervisorName: 'Robert Johnson',
    supervisorContact: 'robert.johnson@hum.org',
    status: 'approved',
    approvedBy: 'Officer David Martinez',
    approvedDate: '2024-01-23',
  },
  {
    id: 'cs-3',
    explorerId: '2',
    eventName: 'Senior Center Activities',
    organization: 'Daytona Beach Senior Center',
    date: '2024-01-20',
    hoursServed: 3,
    description: 'Assisted with recreational activities and provided companionship to senior residents',
    location: 'Daytona Beach Senior Center',
    supervisorName: 'Mary Thompson',
    supervisorContact: 'mary.thompson@dbsc.org',
    status: 'approved',
    approvedBy: 'Officer James Wilson',
    approvedDate: '2024-01-21',
  },
  {
    id: 'cs-4',
    explorerId: '3',
    eventName: 'Youth Mentorship Program',
    organization: 'Boys & Girls Club of Volusia County',
    date: '2024-01-25',
    hoursServed: 5,
    description: 'Mentored at-risk youth and assisted with homework and recreational activities',
    location: 'Boys & Girls Club - Daytona Beach',
    supervisorName: 'Carlos Rodriguez',
    supervisorContact: 'carlos.rodriguez@bgcvc.org',
    status: 'approved',
    approvedBy: 'Officer David Martinez',
    approvedDate: '2024-01-26',
  },
  {
    id: 'cs-5',
    explorerId: '5',
    eventName: 'Animal Shelter Volunteer',
    organization: 'Halifax Humane Society',
    date: '2024-02-01',
    hoursServed: 4,
    description: 'Assisted with animal care, cleaning kennels, and socializing with animals',
    location: 'Halifax Humane Society',
    supervisorName: 'Lisa Davis',
    supervisorContact: 'lisa.davis@halifaxhumane.org',
    status: 'pending',
    notes: 'Awaiting supervisor verification',
  },
  {
    id: 'cs-6',
    explorerId: '7',
    eventName: 'Community Garden Project',
    organization: 'Daytona Beach Community Gardens',
    date: '2024-02-05',
    hoursServed: 3,
    description: 'Helped plant vegetables and maintain community garden plots',
    location: 'Riverfront Park Community Garden',
    supervisorName: 'Patricia Green',
    supervisorContact: 'patricia.green@dbcg.org',
    status: 'approved',
    approvedBy: 'Officer James Wilson',
    approvedDate: '2024-02-06',
  },
  {
    id: 'cs-7',
    explorerId: '9',
    eventName: 'Library Reading Program',
    organization: 'Daytona Beach Regional Library',
    date: '2024-02-08',
    hoursServed: 2,
    description: 'Read stories to children during weekly reading program',
    location: 'Daytona Beach Regional Library',
    supervisorName: 'Amanda Wilson',
    supervisorContact: 'amanda.wilson@dbrl.org',
    status: 'approved',
    approvedBy: 'Officer David Martinez',
    approvedDate: '2024-02-09',
  },
  {
    id: 'cs-8',
    explorerId: '10',
    eventName: 'Habitat for Humanity Build',
    organization: 'Habitat for Humanity Volusia County',
    date: '2024-02-10',
    hoursServed: 8,
    description: 'Assisted with construction of affordable housing for local families',
    location: '1234 Oak Street, Daytona Beach',
    supervisorName: 'Michael Brown',
    supervisorContact: 'michael.brown@habitatvc.org',
    status: 'pending',
    notes: 'Awaiting final approval from construction supervisor',
  },
];

export const upcomingCommunityServiceEvents: CommunityServiceEvent[] = [
  {
    id: 'cse-1',
    title: 'Monthly Beach Cleanup',
    organization: 'Daytona Beach Environmental Group',
    date: '2024-02-17',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Daytona Beach Boardwalk',
    description: 'Join us for our monthly beach cleanup to keep our shores beautiful and protect marine life',
    maxParticipants: 20,
    currentParticipants: ['1', '2', '5'],
    supervisorName: 'Jennifer Martinez',
    supervisorContact: 'jennifer.martinez@dbeg.org',
    hoursOffered: 4,
    requirements: ['Bring water bottle', 'Wear closed-toe shoes', 'Sun protection recommended'],
    status: 'upcoming',
  },
  {
    id: 'cse-2',
    title: 'Food Drive Collection',
    organization: 'Halifax Urban Ministries',
    date: '2024-02-20',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Walmart Supercenter - LPGA Blvd',
    description: 'Help collect non-perishable food items for families in need in our community',
    maxParticipants: 15,
    currentParticipants: ['3', '7', '9'],
    supervisorName: 'Robert Johnson',
    supervisorContact: 'robert.johnson@hum.org',
    hoursOffered: 4,
    requirements: ['Professional appearance required', 'Friendly demeanor', 'Ability to stand for extended periods'],
    status: 'upcoming',
  },
  {
    id: 'cse-3',
    title: 'Senior Center Bingo Night',
    organization: 'Daytona Beach Senior Center',
    date: '2024-02-22',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Daytona Beach Senior Center',
    description: 'Assist with bingo night activities and provide companionship to senior residents',
    maxParticipants: 8,
    currentParticipants: ['2', '10'],
    supervisorName: 'Mary Thompson',
    supervisorContact: 'mary.thompson@dbsc.org',
    hoursOffered: 3,
    requirements: ['Patient and friendly attitude', 'Good communication skills'],
    status: 'upcoming',
  },
  {
    id: 'cse-4',
    title: 'Youth Basketball Tournament',
    organization: 'Boys & Girls Club of Volusia County',
    date: '2024-02-24',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Boys & Girls Club - Daytona Beach',
    description: 'Help organize and supervise youth basketball tournament for local kids',
    maxParticipants: 12,
    currentParticipants: ['1', '3', '5', '7'],
    supervisorName: 'Carlos Rodriguez',
    supervisorContact: 'carlos.rodriguez@bgcvc.org',
    hoursOffered: 8,
    requirements: ['Sports knowledge helpful', 'Ability to work with children', 'Physical activity involved'],
    status: 'upcoming',
  },
];

// Helper functions
export const getCommunityServiceRecordsByExplorer = (explorerId: string): CommunityServiceRecord[] => {
  return communityServiceRecords.filter(record => record.explorerId === explorerId);
};

export const getTotalCommunityServiceHours = (explorerId: string): number => {
  return communityServiceRecords
    .filter(record => record.explorerId === explorerId && record.status === 'approved')
    .reduce((total, record) => total + record.hoursServed, 0);
};

export const getPendingCommunityServiceHours = (explorerId: string): number => {
  return communityServiceRecords
    .filter(record => record.explorerId === explorerId && record.status === 'pending')
    .reduce((total, record) => total + record.hoursServed, 0);
};

export const getAvailableCommunityServiceEvents = (): CommunityServiceEvent[] => {
  return upcomingCommunityServiceEvents.filter(event => event.status === 'upcoming');
};

export const isExplorerRegisteredForEvent = (explorerId: string, eventId: string): boolean => {
  const event = upcomingCommunityServiceEvents.find(e => e.id === eventId);
  return event ? event.currentParticipants.includes(explorerId) : false;
};
