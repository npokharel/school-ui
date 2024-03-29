import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Image = {
  id: number
  createdAt: string,
  updatedAt: string
  imageKey: string
  fileKey?:string
  name: string
  fileName?:string
  size: number
  fileSize?:number
  url: string
  fileUrl?:string
}

export type Student = {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  gender: string;
  dob: Date; // Assuming a string in ISO 8601 format for simplicity
  image: Image[];
  dobNp: string; // Assuming a string in ISO 8601 format for simplicity
  community: string;
  ethnicity: string;
  religion: string;
  nationality: string;
  country: string;
  province: string;
  district: string;
  municipality: string;
  city: string;
  mobile: string;
  phone: string;
  email: string;
  address: string;
  tempAddress: string;
  admissionDate: Date; // Assuming a string in ISO 8601 format for simplicity
  admissionDateNp: Date; // Assuming a string in ISO 8601 format for simplicity
  batch: string;
  group: string;
  section: string;
  registration: string;
  roll: string;
  studentType: string;
  studentCategory: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  guardianName: string;
  guardianAddress: string;
  guardianMobile: string;
  guardianEmail: string;
  guardianRelation: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Student",
    href: "/dashboard/student",
    icon: "user",
    label: "Student",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  /*{
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },*/
];
