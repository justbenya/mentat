'use client';

import '@/i18n';

import dynamic from 'next/dynamic';
import React from 'react';

const App = dynamic(() => import('@/core/App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
