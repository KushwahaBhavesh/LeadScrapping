import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, Plus, Shield, Copy } from 'lucide-react';

export default async function ApiKeysPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <DashboardLayout
            user={{
                email: user.email!,
                full_name: profile?.full_name,
                avatar_url: profile?.avatar_url,
            }}
        >
            <div className="p-8 space-y-8 bg-gray-50/50 dark:bg-gray-950/50 min-h-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-l text-gray-900 dark:text-white">API Keys</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Authenticate your external integrations and custom scripts
                        </p>
                    </div>
                    <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Secret Key
                    </Button>
                </div>

                <div className="grid gap-8">
                    <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                        <CardHeader className="p-8 border-b border-gray-50 dark:border-gray-800">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live API Environment</span>
                            </div>
                            <CardTitle className="text-xl font-bold">Default API Key</CardTitle>
                            <CardDescription>Use this key to authorize requests to the LeadScraper API</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between group">
                                    <code className="text-sm font-mono text-gray-500 dark:text-gray-400 truncate max-w-md">
                                        sk_live_••••••••••••••••••••••••••••••••
                                    </code>
                                    <Button variant="ghost" size="sm" className="rounded-lg h-9 hover:bg-white dark:hover:bg-gray-900 shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all opacity-0 group-hover:opacity-100">
                                        <Copy className="h-3.5 w-3.5 mr-2" />
                                        Copy
                                    </Button>
                                </div>
                                <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Created Oct 12, 2024
                                    </div>
                                    <div>Last used 2 hours ago</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-900 p-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                <Key className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">Read Documentation</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                    Learn how to use your API keys to build custom dashboards or automate
                                    bulk scraping jobs through our developer-first REST API.
                                </p>
                                <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline flex items-center gap-2 pt-2">
                                    Go to API Reference
                                    <Plus className="h-4 w-4 rotate-45" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
