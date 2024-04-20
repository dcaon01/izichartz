import Module from '@/components/modules/ER/Module.js';
import StoreProvider from './StorePrivider.js';

export default function Project() {
    return (
        <main>
            <StoreProvider>
                <Module />
            </StoreProvider>
        </main>
    );
};