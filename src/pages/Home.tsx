import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  FileText, 
  Layout,
  Palette,
  Download,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: "Your data never leaves your device. No accounts, no uploads, no tracking."
  },
  {
    icon: CheckCircle2,
    title: 'ATS-Friendly',
    description: 'All templates are optimized to pass Applicant Tracking Systems with ease.'
  },
  {
    icon: Zap,
    title: 'Real-Time Preview',
    description: 'See your changes instantly as you type. No waiting, no refreshing.'
  },
  {
    icon: Layout,
    title: '20+ Templates',
    description: 'Choose from a wide variety of professional, modern resume designs.'
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Colors, fonts, spacing, layouts — make your resume truly yours.'
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Download as PDF. Print-ready quality every time.'
  }
];

const templatePreviews = [
  { name: 'Professional', color: 'bg-slate-800' },
  { name: 'Modern', color: 'bg-primary' },
  { name: 'Minimal', color: 'bg-gray-600' },
  { name: 'Creative', color: 'bg-purple-600' },
];

const Home: React.FC = () => {
  useEffect(() => {
    // Inject emojicom widget only on the Home page
    let scriptEl: HTMLScriptElement | null = null;
    try {
      (window as any).emojicom_widget = { campaign: 'D7lR9LNbktnZ7bClBwuH' };
      scriptEl = document.createElement('script');
      scriptEl.src = 'https://cdn.emojicom.io/embed/widget.js';
      scriptEl.async = true;
      scriptEl.setAttribute('data-emojicom-injected', 'true');
      document.body.appendChild(scriptEl);
    } catch (e) {
      // fail silently if DOM isn't available
    }
    return () => {
      // Aggressive cleanup: remove all emojicom scripts, iframes, and related DOM
      document.querySelectorAll('script').forEach((el) => {
        const src = (el as HTMLScriptElement).src || '';
        if (src.includes('emojicom.io')) el.remove();
      });
      document.querySelectorAll('iframe').forEach((el) => {
        const src = (el as HTMLIFrameElement).src || '';
        if (src.includes('emojicom.io') || (el as HTMLIFrameElement).title?.toLowerCase().includes('emojicom')) el.remove();
      });
      document.querySelectorAll('[id*="emojicom"], [class*="emojicom"]').forEach(el => el.remove());
      document.querySelectorAll('[data-emojicom-injected], [data-widget*="emojicom"]').forEach(el => el.remove());
      try { delete (window as any).emojicom_widget; } catch (e) { (window as any).emojicom_widget = undefined; }
      try { delete (window as any).emojicom; } catch (e) { (window as any).emojicom = undefined; }
    };
  }, []);

  // Helper to aggressively remove any emojicom-created DOM (in case the widget
  // appends nodes outside the injected script tag). This runs on unmount.
  function removeEmojicomElements() {
    try {
      // remove any scripts referencing emojicom
      document.querySelectorAll('script').forEach((el) => {
        const src = (el as HTMLScriptElement).src || '';
        if (src.includes('emojicom.io')) el.remove();
      });

      // remove iframes added by the widget
      document.querySelectorAll('iframe').forEach((el) => {
        const src = (el as HTMLIFrameElement).src || '';
        if (src.includes('emojicom.io') || (el as HTMLIFrameElement).title?.toLowerCase().includes('emojicom')) el.remove();
      });

      // remove any elements with class or id containing 'emojicom'
      document.querySelectorAll('[id*="emojicom"], [class*="emojicom"]').forEach(el => el.remove());

      // remove any nodes that contain 'emojicom' in data attributes or text
      document.querySelectorAll('[data-emojicom-injected], [data-widget*="emojicom"]').forEach(el => el.remove());

      // try to unset global references
      try { delete (window as any).emojicom_widget; } catch (e) { (window as any).emojicom_widget = undefined; }
      try { delete (window as any).emojicom; } catch (e) { (window as any).emojicom = undefined; }
    } catch (e) {
      // ignore errors during cleanup
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Shield className="w-4 h-4" />
              100% Private — Your data never leaves your browser
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
              Create a Professional{' '}
              <span className="text-primary">Resume</span> in Minutes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Build stunning, ATS-friendly resumes with our free online builder. 
              No sign-up required. Your data stays on your device.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/builder">
                <Button variant="hero" size="xl" className="text-lg px-8">
                  Start Building for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="hero-outline" size="xl" className="text-lg px-8">
                  View Resume Templates
                </Button>
              </Link>
            </div>

            {/* Stats (responsive: stacks on small screens) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>

              {/* horizontal separator for small screens, vertical for sm+ */}
              <div className="sm:hidden h-px w-16 bg-border my-2" />
              <div className="hidden sm:block w-px h-10 bg-border" />

              <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Free</div>
              </div>

              <div className="sm:hidden h-px w-16 bg-border my-2" />
              <div className="hidden sm:block w-px h-10 bg-border" />

              <div>
                <div className="text-3xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Data Uploads</div>
              </div>
            </motion.div>
          </motion.div>

          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume, fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Build Your Resume in 3 Simple Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose a Template', desc: 'Pick from 20+ professional, ATS-optimized designs' },
              { step: '2', title: 'Fill in Your Details', desc: 'Add your experience, skills, and education with our easy editor' },
              { step: '3', title: 'Download & Apply', desc: 'Export as PDF and start applying to your dream jobs' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/builder">
              <Button variant="hero" size="xl">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Social Proof */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Job Seekers Everywhere
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Amritha', role: 'Software Engineer', text: 'Finally, a resume builder that respects my privacy!' },
              { name: 'Kumar', role: 'Marketing Manager', text: 'Created a beautiful resume in under 10 minutes.' },
              { name: 'Emily R.', role: 'Recent Graduate', text: 'Love that I don\'t need to create an account. Simple, fast, and free. What more could you ask for?' },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of job seekers who've created their winning resume with Resumesy.
            </p>
            <Link to="/builder">
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-10"
              >
                Create Your Resume Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Resumesy logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-bold uppercase text-foreground">RESUMESY</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/builder" className="hover:text-foreground transition-colors">Builder</Link>
            </div>
              <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="uppercase">RESUMESY</span>. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
