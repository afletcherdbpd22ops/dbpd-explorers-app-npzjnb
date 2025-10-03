
export interface MeetingAttendance {
  id: string;
  date: string;
  explorerId: string;
  status: 'present' | 'absent' | 'excused';
  notes?: string;
}

export interface WeeklyMeeting {
  id: string;
  date: string;
  topic: string;
  location: string;
  attendanceRecords: MeetingAttendance[];
  totalExpected: number;
}

export const weeklyMeetings: WeeklyMeeting[] = [
  {
    id: '1',
    date: '2024-02-01',
    topic: 'Monthly Planning & Training Updates',
    location: 'Daytona Beach Police Department - Conference Room A',
    totalExpected: 10,
    attendanceRecords: [
      { id: '1', date: '2024-02-01', explorerId: '1', status: 'present' },
      { id: '2', date: '2024-02-01', explorerId: '2', status: 'present' },
      { id: '3', date: '2024-02-01', explorerId: '3', status: 'present' },
      { id: '4', date: '2024-02-01', explorerId: '4', status: 'present' },
      { id: '5', date: '2024-02-01', explorerId: '5', status: 'present' },
      { id: '6', date: '2024-02-01', explorerId: '6', status: 'present' },
      { id: '7', date: '2024-02-01', explorerId: '7', status: 'present' },
      { id: '8', date: '2024-02-01', explorerId: '8', status: 'absent', notes: 'Sick' },
      { id: '9', date: '2024-02-01', explorerId: '9', status: 'present' },
      { id: '10', date: '2024-02-01', explorerId: '10', status: 'present' },
    ],
  },
  {
    id: '2',
    date: '2024-02-08',
    topic: 'Community Outreach Preparation',
    location: 'Daytona Beach Police Department - Conference Room A',
    totalExpected: 10,
    attendanceRecords: [
      { id: '11', date: '2024-02-08', explorerId: '1', status: 'present' },
      { id: '12', date: '2024-02-08', explorerId: '2', status: 'present' },
      { id: '13', date: '2024-02-08', explorerId: '3', status: 'present' },
      { id: '14', date: '2024-02-08', explorerId: '4', status: 'present' },
      { id: '15', date: '2024-02-08', explorerId: '5', status: 'excused', notes: 'Family emergency' },
      { id: '16', date: '2024-02-08', explorerId: '6', status: 'present' },
      { id: '17', date: '2024-02-08', explorerId: '7', status: 'present' },
      { id: '18', date: '2024-02-08', explorerId: '8', status: 'present' },
      { id: '19', date: '2024-02-08', explorerId: '9', status: 'present' },
      { id: '20', date: '2024-02-08', explorerId: '10', status: 'absent', notes: 'No show' },
    ],
  },
  {
    id: '3',
    date: '2024-02-15',
    topic: 'Traffic Safety Training Review',
    location: 'Daytona Beach Police Department - Conference Room A',
    totalExpected: 10,
    attendanceRecords: [
      { id: '21', date: '2024-02-15', explorerId: '1', status: 'present' },
      { id: '22', date: '2024-02-15', explorerId: '2', status: 'present' },
      { id: '23', date: '2024-02-15', explorerId: '3', status: 'present' },
      { id: '24', date: '2024-02-15', explorerId: '4', status: 'present' },
      { id: '25', date: '2024-02-15', explorerId: '5', status: 'present' },
      { id: '26', date: '2024-02-15', explorerId: '6', status: 'present' },
      { id: '27', date: '2024-02-15', explorerId: '7', status: 'present' },
      { id: '28', date: '2024-02-15', explorerId: '8', status: 'present' },
      { id: '29', date: '2024-02-15', explorerId: '9', status: 'present' },
      { id: '30', date: '2024-02-15', explorerId: '10', status: 'present' },
    ],
  },
];
