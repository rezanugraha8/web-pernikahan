import { WEDDING_CONFIG } from '@/config/wedding';
import { useCountdown } from '@/hooks/useCountdown';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CountdownDisplay } from '@/components/ui/CountdownDisplay';

export function CountdownSection() {
  const countdown = useCountdown(WEDDING_CONFIG.event.date);

  return (
    <section id="countdown" className="section-padding" aria-label="Countdown">
      <SectionHeader
        label="Save The Date"
        title="Menuju Hari Bahagia"
        description={
          countdown.isOver
            ? 'Hari yang kami nantikan telah tiba!'
            : 'Hitung mundur menuju hari pernikahan kami.'
        }
        light
      />
      <CountdownDisplay {...countdown} light />
    </section>
  );
}
