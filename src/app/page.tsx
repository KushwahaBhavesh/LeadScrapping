import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Testimonials } from '@/components/landing/testimonials';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { Newsletter } from '@/components/landing/newsletter';
import { MeshBackground } from '@/components/ui/mesh-background';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col selection:bg-primary/30">
            <MeshBackground className="opacity-40" />
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <Testimonials />
                <Newsletter />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}

