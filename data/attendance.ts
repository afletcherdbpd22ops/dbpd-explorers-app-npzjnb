
export interface AttendanceRecord {
  id: string;
  explorerId: string;
  eventId: string;
  eventType: 'weekly_meeting' | 'detail_event';
  eventTitle: string;
  eventDate: string;
  status: 'present' | 'absent' | 'excused';
  notes?: string;
}

export interface AttendanceEvent {
  id: string;
  title: string;
  date: string;
  type: 'weekly_meeting' | 'detail_event';
  location: string;
  description?: string;
  attendanceRecords: AttendanceRecord[];
}

export const attendanceEvents: AttendanceEvent[] = [
  // Weekly Meetings
  {
    id: 'wm-1',
    title: 'Monthly Planning & Training Updates',
    date: '2024-02-01',
    type: 'weekly_meeting',
    location: 'Daytona Beach Police Department - Conference Room A',
    description: 'Monthly planning session and training updates for all Explorers',
    attendanceRecords: [
      { id: 'ar-1', explorerId: '1', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-2', explorerId: '2', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-3', explorerId: '3', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-4', explorerId: '4', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-5', explorerId: '5', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-6', explorerId: '6', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-7', explorerId: '7', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-8', explorerId: '8', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'absent', notes: 'Sick' },
      { id: 'ar-9', explorerId: '9', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
      { id: 'ar-10', explorerId: '10', eventId: 'wm-1', eventType: 'weekly_meeting', eventTitle: 'Monthly Planning & Training Updates', eventDate: '2024-02-01', status: 'present' },
    ],
  },
  {
    id: 'wm-2',
    title: 'Community Outreach Preparation',
    date: '2024-02-08',
    type: 'weekly_meeting',
    location: 'Daytona Beach Police Department - Conference Room A',
    description: 'Preparation for upcoming community outreach events',
    attendanceRecords: [
      { id: 'ar-11', explorerId: '1', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-12', explorerId: '2', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-13', explorerId: '3', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-14', explorerId: '4', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-15', explorerId: '5', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'excused', notes: 'Family emergency' },
      { id: 'ar-16', explorerId: '6', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-17', explorerId: '7', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-18', explorerId: '8', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-19', explorerId: '9', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'present' },
      { id: 'ar-20', explorerId: '10', eventId: 'wm-2', eventType: 'weekly_meeting', eventTitle: 'Community Outreach Preparation', eventDate: '2024-02-08', status: 'absent', notes: 'No show' },
    ],
  },
  // Detail Events
  {
    id: 'de-1',
    title: 'Traffic Safety Detail - Main Street',
    date: '2024-02-03',
    type: 'detail_event',
    location: 'Main Street & International Speedway Blvd',
    description: 'Traffic safety detail during peak hours',
    attendanceRecords: [
      { id: 'ar-21', explorerId: '1', eventId: 'de-1', eventType: 'detail_event', eventTitle: 'Traffic Safety Detail - Main Street', eventDate: '2024-02-03', status: 'present' },
      { id: 'ar-22', explorerId: '2', eventId: 'de-1', eventType: 'detail_event', eventTitle: 'Traffic Safety Detail - Main Street', eventDate: '2024-02-03', status: 'present' },
      { id: 'ar-23', explorerId: '3', eventId: 'de-1', eventType: 'detail_event', eventTitle: 'Traffic Safety Detail - Main Street', eventDate: '2024-02-03', status: 'present' },
      { id: 'ar-24', explorerId: '5', eventId: 'de-1', eventType: 'detail_event', eventTitle: 'Traffic Safety Detail - Main Street', eventDate: '2024-02-03', status: 'present' },
      { id: 'ar-25', explorerId: '7', eventId: 'de-1', eventType: 'detail_event', eventTitle: 'Traffic Safety Detail - Main Street', eventDate: '2024-02-03', status: 'present' },
    ],
  },
  {
    id: 'de-2',
    title: 'Community Event Security - Beach Festival',
    date: '2024-02-10',
    type: 'detail_event',
    location: 'Daytona Beach Boardwalk',
    description: 'Security detail for annual beach festival',
    attendanceRecords: [
      { id: 'ar-26', explorerId: '1', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-27', explorerId: '2', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-28', explorerId: '3', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-29', explorerId: '4', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-30', explorerId: '6', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-31', explorerId: '9', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
      { id: 'ar-32', explorerId: '10', eventId: 'de-2', eventType: 'detail_event', eventTitle: 'Community Event Security - Beach Festival', eventDate: '2024-02-10', status: 'present' },
    ],
  },
  {
    id: 'de-3',
    title: 'School Safety Patrol - Mainland High',
    date: '2024-02-12',
    type: 'detail_event',
    location: 'Mainland High School',
    description: 'School safety patrol during dismissal',
    attendanceRecords: [
      { id: 'ar-33', explorerId: '2', eventId: 'de-3', eventType: 'detail_event', eventTitle: 'School Safety Patrol - Mainland High', eventDate: '2024-02-12', status: 'present' },
      { id: 'ar-34', explorerId: '5', eventId: 'de-3', eventType: 'detail_event', eventTitle: 'School Safety Patrol - Mainland High', eventDate: '2024-02-12', status: 'present' },
      { id: 'ar-35', explorerId: '7', eventId: 'de-3', eventType: 'detail_event', eventTitle: 'School Safety Patrol - Mainland High', eventDate: '2024-02-12', status: 'present' },
      { id: 'ar-36', explorerId: '8', eventId: 'de-3', eventType: 'detail_event', eventTitle: 'School Safety Patrol - Mainland High', eventDate: '2024-02-12', status: 'present' },
    ],
  },
];
