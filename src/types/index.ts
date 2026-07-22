export type AttendanceStatus = 'hadir' | 'tidak_hadir' | 'ragu';

export interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: AttendanceStatus;
  created_at: string;
}

export interface Rsvp {
  id: string;
  name: string;
  guest_count: number;
  attendance: AttendanceStatus;
  note: string | null;
  created_at: string;
}

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
}

export interface Database {
  public: {
    Tables: {
      wishes: {
        Row: Wish;
        Insert: Omit<Wish, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Wish, 'id'>>;
      };
      rsvp: {
        Row: Rsvp;
        Insert: Omit<Rsvp, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Rsvp, 'id'>>;
      };
    };
  };
}

export type ThemeMode = 'light' | 'dark';
