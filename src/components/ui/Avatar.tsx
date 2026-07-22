import { getAvatarGradient, getInitials } from '@/utils/helpers';
import { cn } from '@/lib/cn';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br shrink-0',
        getAvatarGradient(name),
        sizeMap[size],
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}
