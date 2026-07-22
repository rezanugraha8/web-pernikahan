import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  LogOut,
  Trash2,
  Download,
  Users,
  MessageSquare,
} from 'lucide-react';
import { fetchRsvps, deleteRsvp } from '@/services/rsvpService';
import { fetchWishes, deleteWish } from '@/services/wishesService';
import { exportToCsv, formatDateId, getAttendanceLabel } from '@/utils/format';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Rsvp, Wish } from '@/types';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

const SESSION_KEY = 'wedding-admin-auth';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true',
  );
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'rsvp' | 'wishes'>('rsvp');

  const loadData = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const [r, w] = await Promise.all([fetchRsvps(), fetchWishes()]);
      setRsvps(r);
      setWishes(w);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD ?? '';
    if (!adminPass || adminPass === 'your-secure-admin-password') {
      setLoginError('VITE_ADMIN_PASSWORD belum dikonfigurasi.');
      return;
    }
    if (password === adminPass) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Password salah.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
    setPassword('');
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!confirm('Hapus RSVP ini?')) return;
    await deleteRsvp(id);
    setRsvps((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteWish = async (id: string) => {
    if (!confirm('Hapus ucapan ini?')) return;
    await deleteWish(id);
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const exportRsvpCsv = () => {
    exportToCsv(
      rsvps.map((r) => ({
        name: r.name,
        guest_count: r.guest_count,
        attendance: getAttendanceLabel(r.attendance),
        note: r.note ?? '',
        created_at: formatDateId(r.created_at),
      })),
      'rsvp-export.csv',
    );
  };

  const exportWishesCsv = () => {
    exportToCsv(
      wishes.map((w) => ({
        name: w.name,
        message: w.message,
        attendance: getAttendanceLabel(w.attendance),
        created_at: formatDateId(w.created_at),
      })),
      'wishes-export.csv',
    );
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal p-6">
        <GlassCard className="p-8 max-w-md text-center">
          <p className="text-white/70 text-sm">
            Supabase belum dikonfigurasi. Set environment variables terlebih dahulu.
          </p>
        </GlassCard>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-gold-400" />
              <h1 className="font-serif text-xl text-white">Admin Panel</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-pass" className="form-label">
                  Password
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  autoComplete="current-password"
                />
              </div>
              {loginError && (
                <p className="text-xs text-red-400" role="alert">{loginError}</p>
              )}
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => (tab === 'rsvp' ? exportRsvpCsv() : exportWishesCsv())}
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab('rsvp')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-colors ${
              tab === 'rsvp'
                ? 'bg-gold-400 text-charcoal'
                : 'bg-white/5 text-white/50 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> RSVP ({rsvps.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('wishes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-colors ${
              tab === 'wishes'
                ? 'bg-gold-400 text-charcoal'
                : 'bg-white/5 text-white/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Wishes ({wishes.length})
          </button>
        </div>

        {loading ? (
          <div className="text-white/50 text-sm text-center py-20">Memuat data...</div>
        ) : tab === 'rsvp' ? (
          <div className="space-y-3">
            {rsvps.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-12">Belum ada RSVP.</p>
            ) : (
              rsvps.map((r) => (
                <GlassCard key={r.id} className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-medium">{r.name}</p>
                    <p className="text-xs text-white/50 mt-1">
                      {r.guest_count} tamu • {getAttendanceLabel(r.attendance)}
                    </p>
                    {r.note && (
                      <p className="text-xs text-white/40 mt-1 italic">{r.note}</p>
                    )}
                    <time className="text-[10px] text-white/30 mt-2 block">
                      {formatDateId(r.created_at)}
                    </time>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteRsvp(r.id)}
                    aria-label={`Hapus RSVP ${r.name}`}
                    className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </GlassCard>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {wishes.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-12">Belum ada ucapan.</p>
            ) : (
              wishes.map((w) => (
                <GlassCard key={w.id} className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-medium">{w.name}</p>
                    <p className="text-xs text-white/50 mt-1">
                      {getAttendanceLabel(w.attendance)}
                    </p>
                    <p className="text-sm text-white/70 mt-2 italic">
                      &ldquo;{w.message}&rdquo;
                    </p>
                    <time className="text-[10px] text-white/30 mt-2 block">
                      {formatDateId(w.created_at)}
                    </time>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteWish(w.id)}
                    aria-label={`Hapus ucapan ${w.name}`}
                    className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </GlassCard>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
