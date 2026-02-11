import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User, Shield, Bell } from 'lucide-react';

export default async function SettingsPage() {
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
            <div className="p-4 sm:p-8 md:p-12 lg:p-16 space-y-12 bg-gray-50/50 dark:bg-gray-950/50 min-h-full">
                <div>
                    <h1 className="text-display-l text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your account preferences and system configuration
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Settings Navigation */}
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 lg:col-span-1 scrollbar-hide">
                        {[
                            { name: 'Profile', icon: User, active: true },
                            { name: 'Security', icon: Shield },
                            { name: 'Notifications', icon: Bell },
                            { name: 'General', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${item.active
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'
                                    }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Settings Content */}
                    <Card className="lg:col-span-3 border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-gray-50 dark:border-gray-800">
                            <CardTitle className="text-xl font-bold">Account Information</CardTitle>
                            <CardDescription>Update your personal details and public profile</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                                    <div className="h-11 px-4 flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-gray-500 font-mono text-sm">
                                        {user.email}
                                    </div>
                                    <p className="text-[10px] text-gray-400">Email cannot be changed after verification.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={profile?.full_name || ''}
                                        placeholder="Enter your full name"
                                        className="w-full h-11 px-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-end">
                                <Button className="font-bold shadow-lg shadow-primary/20 px-8 h-11 rounded-xl">
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
