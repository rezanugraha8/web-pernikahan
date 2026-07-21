export interface Wish {
  id: string;
  name: string;
  relation: 'Keluarga' | 'Teman Sma/Kuliah' | 'Rekan Kerja' | 'Sahabat' | 'Tetangga' | 'Lainnya';
  wish: string;
  rsvp: 'hadir' | 'tidak_hadir' | 'ragu';
  timestamp: string;
}
