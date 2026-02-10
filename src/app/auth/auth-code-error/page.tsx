import Link from 'next/link';

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                        Authentication Error
                    </h3>
                    <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                        There was an error verifying your email. The link may have expired or is invalid.
                    </p>
                    <div className="mt-4 space-x-4">
                        <Link
                            href="/register"
                            className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400"
                        >
                            Try registering again
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400"
                        >
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
