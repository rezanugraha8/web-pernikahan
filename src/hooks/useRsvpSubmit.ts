import { useCallback, useState } from 'react';
import { createRsvp } from '@/services/rsvpService';
import type { AttendanceStatus } from '@/config/wedding';

export function useRsvpSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: {
      name: string;
      guest_count: number;
      attendance: AttendanceStatus;
      note?: string;
    }) => {
      setSubmitting(true);
      setError(null);
      try {
        await createRsvp({
          name: data.name,
          guest_count: data.guest_count,
          attendance: data.attendance,
          note: data.note ?? null,
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengirim RSVP');
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  return { submit, submitting, success, error };
}
