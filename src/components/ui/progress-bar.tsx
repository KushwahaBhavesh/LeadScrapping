'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    className?: string;
    showLabel?: boolean;
    animated?: boolean;
    color?: 'primary' | 'success' | 'warning' | 'danger';
}

const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
};

export function ProgressBar({
    value,
    max = 100,
    className,
    showLabel = true,
    animated = true,
    color = 'primary',
}: ProgressBarProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    useEffect(() => {
        if (animated) {
            const timeout = setTimeout(() => {
                setDisplayValue(percentage);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setDisplayValue(percentage);
        }
    }, [percentage, animated]);

    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-between mb-1">
                {showLabel && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(percentage)}%
                    </span>
                )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                    className={cn(
                        'h-2.5 rounded-full transition-all duration-500 ease-out',
                        colorClasses[color],
                        animated && 'animate-pulse'
                    )}
                    style={{ width: `${displayValue}%` }}
                />
            </div>
        </div>
    );
}
