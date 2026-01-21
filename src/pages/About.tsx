import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  Zap, 
  Heart,
  ArrowRight,
  FileText,
  Lock,
  Globe,
  Users,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data never leaves your browser. We don\'t collect, store, or sell any personal information. Everything stays on your device.'
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'Creating a professional resume shouldn\'t be complicated. Our intuitive interface lets you build a stunning resume in minutes, not hours.'
  },
  {
    icon: CheckCircle2,
    title: 'ATS Optimization',
    description: 'All our templates are designed to pass Applicant Tracking Systems. Clean formatting, proper headings, and semantic structure ensure your resume gets seen.'
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'We believe everyone deserves access to professional resume tools. Resumesy is completely free with no hidden fees, subscriptions, or premium features locked away.'
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About Resumesy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We built Resumesy because we believe creating a professional resume 
              should be simple, free, and private. No accounts, no uploads, no 
              tracking — just a powerful tool that helps you land your dream job.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Job hunting is stressful enough without worrying about your data 
                being sold or stored on unknown servers. We created Resumesy as 
                a response to the countless resume builders that require sign-ups, 
                store your personal information, and lock features behind paywalls.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With Resumesy, everything happens in your browser. Your resume 
                data is stored locally on your device using your browser's storage. 
                When you close the tab, we have no record of you ever being here — 
                and that's exactly how it should be.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Lock className="w-4 h-4" />
                  100% Private
                </div>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Globe className="w-4 h-4" />
                  Works Offline
                </div>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Users className="w-4 h-4" />
                  No Account Needed
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl p-8">
                  <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                          <img src="/logo.png" alt="Resumesy logo" className="w-10 h-10 rounded-lg object-cover" />
                      </div>
                    <div>
                      <div className="font-bold text-foreground">Resumesy</div>
                      <div className="text-sm text-muted-foreground">Privacy-First Resume Builder</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      No data collection
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      No account required
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      No tracking scripts
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Works completely offline
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      100% free forever
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make in building Resumesy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What Makes a Resume ATS-Friendly?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Applicant Tracking Systems (ATS) are software used by companies to 
              filter resumes before they reach human recruiters. Many beautifully 
              designed resumes fail because they use layouts and formatting that 
              ATS can't parse correctly.
            </p>
            
            <div className="bg-accent/50 rounded-2xl p-8 text-left border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                All Resumesy templates are optimized for ATS with:
              </h3>
              <ul className="space-y-3">
                {[
                  'Clean, semantic HTML structure',
                  'Proper heading hierarchy (H1, H2, H3)',
                  'No tables for layout — uses CSS Grid instead',
                  'No images or icons for text content',
                  'Standard fonts that are universally readable',
                  'Clear section labels (Experience, Education, Skills)',
                  'Bullet points for easy scanning',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Start creating your professional, ATS-friendly resume today. 
              No sign-up required.
            </p>
            <Link to="/builder">
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-10"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About the Developer */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">About the Developer</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-card rounded-xl p-6">
              <img src="/logo.png" alt="Developer avatar" className="w-20 h-20 rounded-lg object-cover" />

              <div className="text-left">
                <div className="font-semibold text-foreground">Rudransh</div>
                <div className="text-sm text-muted-foreground mb-2">Creator of Resumesy</div>
                <p className="text-sm text-muted-foreground mb-3">I build privacy-first web tools focused on simplicity and performance. Resumesy was created to help people craft ATS-friendly resumes without compromising privacy or ease-of-use.</p>

                <div className="flex items-center gap-3">
                  <a href="https://github.com/rd9437" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>
                  <a href="https://rudransh.rf.gd" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Portfolio</a>
                  <a href="https://privpdf.rf.gd" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    PrivPDF
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="uppercase">RESUMESY</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;
