'use client';

import { cn } from '@/lib/utils';

interface MeshBackgroundProps {
    className?: string;
}

export function MeshBackground({ className }: MeshBackgroundProps) {
    return (
        <div className={cn("fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-black", className)}>
            {/* Extremely Subtle Sophisticated Gradients for Light Theme */}
            <div
                className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-slate-100 blur-[130px] opacity-60 dark:opacity-20"
            />
            <div
                className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-[130px] opacity-40 dark:opacity-10"
            />

            {/* Pure Geometric Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Fine Grain */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply pointer-events-none" />
        </div>
    );
}
