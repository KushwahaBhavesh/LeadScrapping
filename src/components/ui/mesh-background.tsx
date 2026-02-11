'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function MeshBackground({ className }: { className?: string }) {
    return (
        <div className={cn("fixed inset-0 -z-20 bg-gray-50 dark:bg-black", className)}>
            {/* Soft Ambient Light */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />

            {/* Professional Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] opacity-100" />

            {/* Minimalist Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-200 dark:bg-white/5" />
        </div>
    );
}
