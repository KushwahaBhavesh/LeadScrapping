import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Alex Rivera',
        role: 'Head of Growth',
        company: 'SaaSFlow',
        image: 'https://i.pravatar.cc/150?u=alex',
        quote: 'The AI qualification engine is a game changer. We reduced our prospecting time by 70% while increasing lead quality significantly.',
    },
    {
        name: 'Sarah Chen',
        role: 'Sales Director',
        company: 'CloudScale',
        image: 'https://i.pravatar.cc/150?u=sarah',
        quote: 'LeadScraper AI finds data that other tools miss. It’s like having a full-time researcher working 24/7 on our pipeline.',
    },
    {
        name: 'Marcus Thorne',
        role: 'Founder',
        company: 'VentureOps',
        image: 'https://i.pravatar.cc/150?u=marcus',
        quote: 'The API is incredibly clean. We integrated LeadScraper into our internal workflow in less than a day. Highly recommended.',
    },
];

export function Testimonials() {
    return (
        <section className="bg-white dark:bg-gray-950 py-24 md:py-32">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                    <h2 className="text-display-l text-gray-900 dark:text-white">
                        Trusted by <span className="text-primary italic">forward-thinking</span> <br />
                        sales and growth teams.
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed text-lg">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 border-t border-gray-50 dark:border-gray-700 pt-6 mt-auto">
                                <Avatar className="h-12 w-12 border-2 border-primary/10">
                                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                    <AvatarFallback className="bg-primary/5 text-primary font-bold">
                                        {testimonial.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
