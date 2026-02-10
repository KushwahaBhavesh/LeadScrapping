"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { CustomCursor } from "./ui/custom-cursor";

export function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>;

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <ReactLenis root options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 1.1,
                touchMultiplier: 2
            }}>
                <CustomCursor />
                {children}
            </ReactLenis>
        </ThemeProvider>
    );
}
