'use client';

import { usePathname } from 'next/navigation';
import FadeWrapper from './FadeWrapper';
import DelayedFallback from './DelayedFallback';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <DelayedFallback/>
      <FadeWrapper key={pathname}>
        {children}
      </FadeWrapper>
    </>
  );
}