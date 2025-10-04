
export interface NewMemberApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  schoolName: string;
  gradeLevel: string;
  gpa?: string;
  whyJoin: string;
  priorExperience?: string;
  availableHours: string[];
  hasTransportation: boolean;
  parentConsent: boolean;
  backgroundCheck: boolean;
  hasCharges: boolean;
  chargeDetails?: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  notes?: string;
}

export const memberApplications: NewMemberApplication[] = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.thompson@email.com',
    phone: '(386) 555-0200',
    dateOfBirth: '2006-05-15',
    address: '123 Ocean Ave',
    city: 'Daytona Beach',
    state: 'FL',
    zipCode: '32114',
    emergencyContactName: 'Susan Thompson',
    emergencyContactPhone: '(386) 555-0201',
    emergencyContactRelation: 'Mother',
    schoolName: 'Mainland High School',
    gradeLevel: '11th',
    gpa: '3.7',
    whyJoin: 'I want to serve my community and learn about law enforcement. I believe the Explorer program will help me develop leadership skills and prepare me for a career in public service.',
    priorExperience: 'Volunteer at local animal shelter, member of school debate team',
    availableHours: ['Weekday Evenings', 'Weekends'],
    hasTransportation: true,
    parentConsent: true,
    backgroundCheck: true,
    hasCharges: false,
    status: 'pending',
    submittedDate: '2024-02-10',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@email.com',
    phone: '(386) 555-0202',
    dateOfBirth: '2007-08-22',
    address: '456 Beach St',
    city: 'Daytona Beach',
    state: 'FL',
    zipCode: '32118',
    emergencyContactName: 'Carlos Santos',
    emergencyContactPhone: '(386) 555-0203',
    emergencyContactRelation: 'Father',
    schoolName: 'Seabreeze High School',
    gradeLevel: '10th',
    gpa: '3.9',
    whyJoin: 'I am interested in criminal justice and want to gain hands-on experience. The Explorer program seems like the perfect opportunity to learn from professionals and give back to my community.',
    priorExperience: 'Student council member, volunteer at food bank',
    availableHours: ['Weekends', 'Summer Full-time'],
    hasTransportation: false,
    parentConsent: true,
    backgroundCheck: true,
    hasCharges: false,
    status: 'interview_scheduled',
    submittedDate: '2024-02-05',
    reviewedBy: 'Officer David Martinez',
    reviewedDate: '2024-02-08',
    notes: 'Excellent application. Interview scheduled for 2/20.',
  },
  {
    id: '3',
    firstName: 'Jordan',
    lastName: 'Williams',
    email: 'jordan.williams@email.com',
    phone: '(386) 555-0204',
    dateOfBirth: '2005-12-03',
    address: '789 Ridgewood Ave',
    city: 'Daytona Beach',
    state: 'FL',
    zipCode: '32114',
    emergencyContactName: 'Michelle Williams',
    emergencyContactPhone: '(386) 555-0205',
    emergencyContactRelation: 'Mother',
    schoolName: 'Father Lopez Catholic High School',
    gradeLevel: '12th',
    gpa: '3.5',
    whyJoin: 'I plan to pursue a career in law enforcement after graduation and military service. The Explorer program will give me valuable experience and help me understand what police work really involves.',
    priorExperience: 'JROTC member, volunteer firefighter cadet',
    availableHours: ['Weekday Evenings', 'Weekends', 'Summer Full-time'],
    hasTransportation: true,
    parentConsent: true,
    backgroundCheck: true,
    hasCharges: false,
    status: 'approved',
    submittedDate: '2024-01-28',
    reviewedBy: 'Officer James Wilson',
    reviewedDate: '2024-02-01',
    notes: 'Strong candidate with military background. Approved for next orientation.',
  },
  {
    id: '4',
    firstName: 'Tyler',
    lastName: 'Johnson',
    email: 'tyler.johnson@email.com',
    phone: '(386) 555-0206',
    dateOfBirth: '2006-09-12',
    address: '321 Nova Rd',
    city: 'Daytona Beach',
    state: 'FL',
    zipCode: '32117',
    emergencyContactName: 'Robert Johnson',
    emergencyContactPhone: '(386) 555-0207',
    emergencyContactRelation: 'Father',
    schoolName: 'Atlantic High School',
    gradeLevel: '11th',
    gpa: '3.2',
    whyJoin: 'I want to make a positive difference in my community and learn about law enforcement. I believe this program will help me grow as a person and develop important life skills.',
    priorExperience: 'Volunteer at local youth center, member of school soccer team',
    availableHours: ['Weekday Evenings', 'Weekends'],
    hasTransportation: true,
    parentConsent: true,
    backgroundCheck: true,
    hasCharges: true,
    chargeDetails: 'I was charged with a misdemeanor for underage possession of alcohol at a party in 2023. I completed community service and attended alcohol education classes. The charge was dismissed upon completion of the program. I learned from this mistake and have not had any issues since.',
    status: 'pending',
    submittedDate: '2024-02-12',
    notes: 'Application under review due to disclosed charge. Awaiting advisor decision.',
  },
];
