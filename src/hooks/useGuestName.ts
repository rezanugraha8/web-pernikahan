import { useEffect, useState } from 'react';

export function useGuestName(defaultName = 'Tamu Undangan') {
  const [guestName, setGuestName] = useState(defaultName);
  const [isVip, setIsVip] = useState(false);
  const [rank, setRank] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const p = params.get('p');

    if (to) setGuestName(decodeURIComponent(to).trim());
    if (p) {
      if (p.toUpperCase() === 'VIP') setIsVip(true);
      else setRank(decodeURIComponent(p));
    }
  }, []);

  return { guestName, isVip, rank };
}
