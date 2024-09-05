'use client';

import { Suspense, useRef } from 'react';
import { Provider } from 'react-redux';
import makeStore from '@/store/design/store.js';
import LoadingItem from '@/components/loading/LoadingItem';

export default function StoreProvider({ children, content }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(content); // Creiamo lo store e gli slices
  }

  return (
    <Suspense fallback={
      <div style={{
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <LoadingItem text="Loading project..." />
      </div>
    }>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </Suspense>
  );
}