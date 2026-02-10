'use client';

import { cn } from '@/lib/utils';

interface MeshBackgroundProps {
    className?: string;
}

export function MeshBackground({ className }: MeshBackgroundProps) {
    return (
        <div className={cn("fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-gray-950", className)}>
            {/* Animated Mesh Gradients */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse"
                style={{ animationDuration: '8s' }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse"
                style={{ animationDuration: '12s', animationDelay: '2s' }}
            />
            <div
                className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-400/10 blur-[100px] animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '4s' }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
}

