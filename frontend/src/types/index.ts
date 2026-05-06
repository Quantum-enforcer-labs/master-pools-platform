export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  avatar?: { url: string; fileId: string };
  isVerified?: boolean;
  isActive: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  url: string;
  fileId: string;
  thumbnail?: string;
  alt?: string;
}

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "olympic"
  | "infinity"
  | "indoor"
  | "natural"
  | "custom";
export type ProjectStatus = "completed" | "ongoing" | "upcoming";

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  coverImage?: ProjectImage;
  gallery?: ProjectImage[];
  location?: string;
  client?: string;
  duration?: string;
  area?: string;
  depth?: string;
  features?: string[];
  tags?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string;
  completedAt?: string;
  startedAt?: string;
  views: number;
  createdBy?: Pick<User, "_id" | "name">;
  createdAt: string;
  updatedAt: string;
}

export type PoolType =
  | "residential"
  | "commercial"
  | "olympic"
  | "infinity"
  | "indoor"
  | "natural"
  | "custom";
export type PoolShape =
  | "rectangular"
  | "oval"
  | "kidney"
  | "freeform"
  | "circular"
  | "lap"
  | "custom";
export type QuotationStatus =
  | "pending"
  | "reviewing"
  | "quoted"
  | "accepted"
  | "rejected"
  | "expired";

export interface CostBreakdownItem {
  item: string;
  cost: number;
  description?: string;
}

export interface Quotation {
  _id: string;
  user: User | string;
  referenceNumber: string;
  status: QuotationStatus;
  poolType: PoolType;
  poolShape: PoolShape;
  dimensions?: {
    length?: number;
    width?: number;
    depth?: number;
    unit: string;
  };
  features?: string[];
  location?: { address?: string; city?: string; country?: string };
  budget?: { min?: number; max?: number; currency: string };
  timeline?: string;
  additionalNotes?: string;
  attachments?: { url: string; fileId: string; name: string }[];
  quotedAmount?: {
    amount: number;
    currency: string;
    breakdown?: CostBreakdownItem[];
  };
  validUntil?: string;
  adminNotes?: string;
  quotedBy?: User;
  quotedAt?: string;
  conversationId?: { _id: string } | string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  sender: User;
  senderRole: "user" | "admin";
  content: string;
  type: "text" | "image" | "quotation" | "system";
  attachments?: { url: string; fileId: string; name: string }[];
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  user: User;
  quotation?: Quotation;
  subject: string;
  status: "open" | "closed" | "archived";
  lastMessage?: string;
  lastMessageAt?: string;
  unreadByUser: number;
  unreadByAdmin: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: User;
  project?: Pick<Project, "_id" | "title" | "slug">;
  rating: number;
  title: string;
  content: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit?: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirm: string;
}
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
