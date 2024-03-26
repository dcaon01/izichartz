import ER from '@/components/modules/ER/ER.js';
import StoreProvider from './StorePrivider.js';

export default function Home() {
  return (
    <main>
        <StoreProvider>
          <ER />
        </StoreProvider>
    </main>
  );
}
