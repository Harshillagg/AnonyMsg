'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const DelayedFallback = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!loading) return null;

  return <Loader />;
};

export default DelayedFallback;