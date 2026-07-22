import { memo, useState } from 'react';
import { cn } from '@/lib/cn';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export const LazyImage = memo(function LazyImage({
  alt,
  className,
  wrapperClassName,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && (
        <div className="absolute inset-0 bg-cream-200 animate-pulse" aria-hidden="true" />
      )}
      <img
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </div>
  );
});
