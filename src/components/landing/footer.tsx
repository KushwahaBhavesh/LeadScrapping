import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative pt-24 pb-12 overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                                <Zap className="h-6 w-6 text-white fill-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                                LeadScraper <span className="text-primary italic lowercase">AI</span>
                            </span>
                        </Link>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-sm leading-relaxed">
                            Setting the gold standard for AI-native lead generation.
                            Build your pipeline with precision data and autonomous agents.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Github, href: '#' },
                                { icon: Mail, href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="h-12 w-12 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-xl transition-all"
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {['Features', 'Lead Database', 'AI Filtering', 'API Access', 'Integrations'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary font-bold text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Resources</h4>
                        <ul className="space-y-4">
                            {['Documentation', 'API Reference', 'Growth Blog', 'Case Studies', 'Help Center'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary font-bold text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Status'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary font-bold text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        © {new Date().getFullYear()} LeadScraper AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">All systems operational</span>
                    </div>
                </div>
            </div>

            {/* Background noise effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </footer>
    );
}
