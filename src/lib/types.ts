import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  connections: string[];
  avatarUrl?: string;
}

export interface Job {
  id:string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedBy: string;
  postedById: string;
  createdAt: Timestamp;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  timestamp: Timestamp;
}
