import { useCallback, useEffect, useState } from 'react';
import {
  createWish,
  fetchWishes,
  subscribeWishes,
} from '@/services/wishesService';
import type { Wish } from '@/types';
import type { AttendanceStatus } from '@/config/wedding';

export function useWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchWishes()
      .then((data) => {
        if (mounted) setWishes(data);
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const unsubscribe = subscribeWishes((newWish) => {
      setWishes((prev) => {
        if (prev.some((w) => w.id === newWish.id)) return prev;
        return [newWish, ...prev];
      });
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const submitWish = useCallback(
    async (data: {
      name: string;
      message: string;
      attendance: AttendanceStatus;
    }) => {
      const created = await createWish(data);
      setWishes((prev) => {
        if (prev.some((w) => w.id === created.id)) return prev;
        return [created, ...prev];
      });
      return created;
    },
    [],
  );

  return { wishes, loading, error, submitWish };
}
