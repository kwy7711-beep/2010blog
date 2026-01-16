export interface Post {
  id: string;
  category: string;
  title: string;
  content: string;
  date: string;
  comments: Comment[];
  likes: number;
  // New optional fields for the Inso features
  attachmentName?: string;
  attachmentContent?: string;
  cyworldLink?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isOwner?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export enum ViewMode {
  BLOG = 'BLOG',
  PROLOGUE = 'PROLOGUE',
  GUESTBOOK = 'GUESTBOOK',
  WRITE = 'WRITE'
}