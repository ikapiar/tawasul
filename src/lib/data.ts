import type { CalendarProps } from "@/components/ui/calendar";

export type Alumni = {
  id: string;
  name: string;
  avatar: string;
  graduationYear: number;
  major: string;
  job: string;
  company: string;
  skills: string[];
};

export const alumniData: Alumni[] = [
  { id: '1', name: 'Eleanor Vance', avatar: 'https://placehold.co/100x100.png', graduationYear: 2012, major: 'Computer Science', job: 'Senior Software Engineer', company: 'Innovate Corp', skills: ['React', 'Node.js', 'GraphQL'] },
  { id: '2', name: 'Marcus Thorne', avatar: 'https://placehold.co/100x100.png', graduationYear: 2010, major: 'Business Administration', job: 'Product Manager', company: 'Solutions Inc.', skills: ['Agile', 'Roadmapping', 'UX'] },
  { id: '3', name: 'Isabella Rossi', avatar: 'https://placehold.co/100x100.png', graduationYear: 2015, major: 'Graphic Design', job: 'Lead UI/UX Designer', company: 'Creative Minds', skills: ['Figma', 'Sketch', 'Prototyping'] },
  { id: '4', name: 'Julian Alvarez', avatar: 'https://placehold.co/100x100.png', graduationYear: 2018, major: 'Marketing', job: 'Digital Marketing Specialist', company: 'Growth Co.', skills: ['SEO', 'Content Marketing', 'PPC'] },
  { id: '5', name: 'Sophia Chen', avatar: 'https://placehold.co/100x100.png', graduationYear: 2011, major: 'Finance', job: 'Financial Analyst', company: 'Capital Investments', skills: ['Modeling', 'Valuation', 'Excel'] },
  { id: '6', name: 'Liam Goldberg', avatar: 'https://placehold.co/100x100.png', graduationYear: 2019, major: 'Data Science', job: 'Data Scientist', company: 'Future AI', skills: ['Python', 'ML', 'Tableau'] },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  posted: string;
};

export const jobData: Job[] = [
  { id: '1', title: 'Frontend Developer', company: 'Innovate Corp', location: 'Remote', type: 'Full-time', posted: '2 days ago' },
  { id: '2', title: 'Marketing Intern', company: 'Growth Co.', location: 'New York, NY', type: 'Internship', posted: '1 week ago' },
  { id: '3', title: 'UX Designer', company: 'Creative Minds', location: 'San Francisco, CA', type: 'Full-time', posted: '3 days ago' },
  { id: '4', title: 'Data Analyst Intern', company: 'Future AI', location: 'Remote', type: 'Internship', posted: '5 days ago' },
];

export type Mentor = {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  job: string;
  availability: 'Available' | 'Limited' | 'Unavailable';
};

export const mentorshipData: Mentor[] = [
  { id: '1', name: 'Eleanor Vance', avatar: 'https://placehold.co/100x100.png', expertise: ['Software Development', 'Career Growth'], job: 'Senior Software Engineer', availability: 'Available' },
  { id: '2', name: 'Marcus Thorne', avatar: 'https://placehold.co/100x100.png', expertise: ['Product Management', 'Startups'], job: 'Product Manager', availability: 'Limited' },
  { id: '3', name: 'Isabella Rossi', avatar: 'https://placehold.co/100x100.png', expertise: ['UI/UX Design', 'Portfolio Review'], job: 'Lead UI/UX Designer', availability: 'Available' },
];

export type Event = {
  id: string;
  title: string;
  date: Date;
  description: string;
  type: 'Networking' | 'Webinar' | 'Reunion';
};

export const eventData: Event[] = [
  { id: '1', title: 'Annual Alumni Mixer', date: new Date(new Date().setMonth(new Date().getMonth() + 1, 15)), description: 'Connect with fellow alumni over drinks and appetizers.', type: 'Networking' },
  { id: '2', title: 'Webinar: The Future of AI', date: new Date(new Date().setMonth(new Date().getMonth() + 1, 22)), description: 'Join Liam Goldberg for a talk on emerging AI trends.', type: 'Webinar' },
  { id: '3', title: 'Class of 2014 Reunion', date: new Date(new Date().setMonth(new Date().getMonth() + 2, 5)), description: '10-year reunion for the class of 2014.', type: 'Reunion' },
];

export const eventDays: CalendarProps['modifiers'] = {
  ...eventData.reduce((acc, event) => ({ ...acc, [event.id]: event.date }), {}),
};

export const eventDayStyle: CalendarProps['modifiersStyles'] = {
  ...eventData.reduce((acc, event) => ({ ...acc, [event.id]: { color: 'hsl(var(--accent-foreground))', backgroundColor: 'hsl(var(--accent))' } }), {}),
};

export type Message = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
};

export const messageData: Message[] = [
  { id: '1', name: 'Eleanor Vance', avatar: 'https://placehold.co/100x100.png', lastMessage: "Of course, happy to help with your resume!", timestamp: '10:42 AM', unread: 0 },
  { id: '2', name: 'Marcus Thorne', avatar: 'https://placehold.co/100x100.png', lastMessage: "Great question. Let's find a time to chat.", timestamp: 'Yesterday', unread: 2 },
  { id: '3', name: 'Julian Alvarez', avatar: 'https://placehold.co/100x100.png', lastMessage: "The marketing event was fantastic!", timestamp: '2 days ago', unread: 0 },
];

export const chatHistory = [
    { sender: 'other', text: "Hi there! I'm a current student and saw your profile. Your career path is really inspiring!" },
    { sender: 'me', text: "Hi! Thanks for reaching out. I'm happy to answer any questions you might have." },
    { sender: 'other', text: "I'd love to learn more about your experience as a product manager. Do you have any advice for someone interested in that field?" },
    { sender: 'other', text: "Also, I was wondering if you'd be open to reviewing my resume?" },
    { sender: 'me', text: "Great question. Let's find a time to chat about product management. And of course, happy to help with your resume! Send it over." },
];

// NOTE: The 'posted' field in jobData contains relative time strings.
// A robust implementation would calculate these dynamically based on a timestamp.
// For this example, we'll keep them as static strings and will not localize them.
// The same applies to eventData titles and descriptions and chatHistory,
// as they represent dynamic user-generated content.
