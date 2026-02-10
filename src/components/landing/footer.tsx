import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-16 md:py-24">
            <div className="container px-4 mx-auto">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-y-0 gap-2 group">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                LeadScraper <span className="text-primary italic">AI</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Empowering sales teams with high-precision, AI-driven lead
                            intelligence across the open web.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Product</h4>
                        <ul className="space-y-3">
                            {['Features', 'Pricing', 'Documentation', 'API'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
                        <ul className="space-y-3">
                            {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Legal</h4>
                        <ul className="space-y-3">
                            {['Privacy', 'Terms', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} LeadScraper AI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
