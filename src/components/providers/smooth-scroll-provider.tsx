"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>;

    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 2,
            infinite: false,
        }}>
            {children}
        </ReactLenis>
    );
}
