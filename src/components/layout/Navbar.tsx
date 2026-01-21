import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Resumesy logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-xl font-bold text-foreground">RESUMESY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/templates">
              <Button
                variant="ghost"
                className={isActive('/templates') ? 'bg-accent text-accent-foreground' : ''}
              >
                Resume Templates
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="ghost"
                className={isActive('/about') ? 'bg-accent text-accent-foreground' : ''}
              >
                About
              </Button>
            </Link>
          </div>

          {/* CTA Button + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/builder">
              <Button variant="hero" size="lg">
                Create Resume
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-accent text-foreground"
              >
                Resume Templates
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-accent text-foreground"
              >
                About
              </Link>
              <Link
                to="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="hero" className="w-full">
                  Create Resume
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
