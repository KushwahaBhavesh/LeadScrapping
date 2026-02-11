import { LucideIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center h-96 text-center px-4',
                'border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl',
                'bg-white dark:bg-gray-900',
                className
            )}
        >
            <Icon className="h-12 w-12 mb-4 text-gray-300 dark:text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">{description}</p>
            )}
            {action && (
                <Button onClick={action.onClick} className="font-bold shadow-lg shadow-primary/20">
                    {action.label}
                </Button>
            )}
        </div>
    );
}
