
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'training' | 'meeting' | 'community' | 'ceremony';
  isRequired: boolean;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Monthly Explorer Meeting',
    date: '2024-02-15',
    time: '7:00 PM',
    location: 'Daytona Beach Police Department',
    description: 'Monthly meeting to discuss upcoming events, training opportunities, and community service projects.',
    type: 'meeting',
    isRequired: true,
  },
  {
    id: '2',
    title: 'Traffic Safety Training',
    date: '2024-02-20',
    time: '6:00 PM',
    location: 'Training Room A',
    description: 'Learn about traffic safety procedures, proper signaling techniques, and crowd control methods.',
    type: 'training',
    isRequired: true,
  },
  {
    id: '3',
    title: 'Community Outreach Event',
    date: '2024-02-25',
    time: '10:00 AM',
    location: 'Daytona Beach Boardwalk',
    description: 'Assist with community outreach and public relations at the boardwalk event.',
    type: 'community',
    isRequired: false,
  },
  {
    id: '4',
    title: 'First Aid & CPR Certification',
    date: '2024-03-05',
    time: '9:00 AM',
    location: 'Training Center',
    description: 'Mandatory first aid and CPR certification training for all active explorers.',
    type: 'training',
    isRequired: true,
  },
  {
    id: '5',
    title: 'Awards Ceremony',
    date: '2024-03-15',
    time: '6:30 PM',
    location: 'City Hall Auditorium',
    description: 'Annual awards ceremony recognizing outstanding explorer achievements and service.',
    type: 'ceremony',
    isRequired: false,
  },
  {
    id: '6',
    title: 'Ride Along Program',
    date: '2024-03-22',
    time: '7:00 PM',
    location: 'Police Station',
    description: 'Opportunity to ride along with officers during their patrol shifts.',
    type: 'training',
    isRequired: false,
  },
];
