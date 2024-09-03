'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import makeStore from '@/store/design/store.js';

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(); // Creiamo lo store e gli slices
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}