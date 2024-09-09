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
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <LoadingItem text="Loading project..." circleSize={30}/>
      </div>
    }>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </Suspense>
  );
}