export const WEDDING_CONFIG = {
  groom: {
    fullName: 'Mohamad Reza Nugraha',
    nickname: 'Eca',
    parents: 'Putra ke-2 dari Bapak Tarmubi (Almarhum)',
    instagram: '_rezanugrahaa',
    bio: 'Lahir di Cimahi pada tanggal 8 Oktober 1999.',
    photo: '/foto/pengantin%20pria.jpeg',
  },
  bride: {
    fullName: 'Shafia Salsa Halwa',
    nickname: 'Caca',
    parents: 'Putri ke-2 dari Bapak Supardi',
    instagram: 'shafiasalsaa',
    bio: 'Lahir di Bandung pada tanggal 4 Juni 2002.',
    photo: '/foto/pengantin%20wanita.jpeg',
  },
  couple: {
    monogram: 'R & S',
    displayName: 'Reza & Shafia',
    quote: {
      verse:
        'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      source: 'QS. Ar-Rum: 21',
    },
  },
  event: {
    date: '2026-08-09T07:00:00+07:00',
    displayDate: 'Minggu, 9 Agustus 2026',
    location: 'Cimahi, Jawa Barat',
    venue: 'Gedung Aula Layanan Sosial Dinas Sosial Provinsi Jawa Barat',
    address:
      'Jl. Jend. H. Amir Machmud No.331, Cibabat, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40523',
    mapsUrl: 'https://maps.app.goo.gl/CG5TSMURbCxfBjDdA',
    akad: {
      title: 'Akad Nikah',
      time: '07.00 - 10.30 WIB',
      description:
        'Akad nikah intim bagi keluarga besar dan kerabat terdekat. Dilanjutkan dengan ritual adat tradisi perpaduan luhur.',
    },
    reception: {
      title: 'Resepsi Pernikahan',
      time: '11.00 - 14.00 WIB',
      description:
        'Merayakan hari bahagia kedua mempelai melalui acara ramah tamah dan santap siang bersama.',
    },
  },
  gifts: {
    accounts: [
      {
        id: 'bca-reza',
        bank: 'Bank BCA',
        number: '1392319292',
        holder: 'Mohamad Reza Nugraha',
      },
      {
        id: 'bca-shafia',
        bank: 'Bank BCA',
        number: '2810576378',
        holder: 'Shafia Salsa Halwa',
      },
    ],
    qris: '/foto/QRIS.jpeg',
  },
  media: {
    backgroundVideos: ['/background1.mp4', '/background2.mp4'],
    music: '/lagu.mp3',
    thumbnail: '/thumbnail.jpeg',
  },
  loveStory: [
    {
      year: '2020',
      title: 'Awal Pertemuan',
      description:
        'Dipertemukan Tuhan di acara pertunangan sahabat semasa kecilnya. Pertemuan yang tak terduga ini menjadi titik awal dari perjalanan cinta kami.',
    },
    {
      year: '2020 – 2026',
      title: 'Perjalanan Berdua',
      description:
        'Berhubungan mulai 28 Desember 2020. Diisi dengan petualangan, diskusi mendalam, serta saling mendukung karir masing-masing.',
    },
    {
      year: '2026',
      title: 'Lamaran & Pernikahan',
      description:
        'Bertunangan pada 29 Maret 2026 dan melangkah ke jenjang pernikahan pada 9 Agustus 2026.',
    },
  ],
  gallery: [
    { type: 'image' as const, src: '/foto/prewed%20jawa1.jpeg', alt: 'Prewedding adat Jawa', caption: 'Harmoni Tradisi' },
    { type: 'image' as const, src: '/foto/prewed%20jawa2.jpeg', alt: 'Prewedding Jawa', caption: 'Kasih Luhur' },
    { type: 'image' as const, src: '/foto/prewed%20jawa3.jpeg', alt: 'Potret elegan', caption: 'Janji Abadi' },
    { type: 'image' as const, src: '/foto/prewed%20pantai1.jpeg', alt: 'Tepi pantai', caption: 'Langkah Bersama' },
    { type: 'video' as const, src: '/background1.mp4', alt: 'Momen prewedding video 1', caption: 'Cinematic Love' },
    { type: 'image' as const, src: '/foto/prewed%20pantai6.jpeg', alt: 'Senja di pantai', caption: 'Senja Romantis' },
    { type: 'image' as const, src: '/foto/prewed%20pantai3.jpeg', alt: 'Keceriaan pantai', caption: 'Debur Ombak' },
    { type: 'video' as const, src: '/background2.mp4', alt: 'Momen prewedding video 2', caption: 'Forever Starts Here' },
    { type: 'image' as const, src: '/foto/prewed%20jawa5.jpeg', alt: 'Prewedding Jawa 5', caption: 'Elegance' },
    { type: 'image' as const, src: '/foto/prewed%20pantai5.jpeg', alt: 'Prewedding pantai 5', caption: 'Pure Joy' },
  ],
} as const;

export type AttendanceStatus = 'hadir' | 'tidak_hadir' | 'ragu';

export const ATTENDANCE_OPTIONS: { value: AttendanceStatus; label: string }[] = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'ragu', label: 'Ragu' },
  { value: 'tidak_hadir', label: 'Tidak Hadir' },
];
