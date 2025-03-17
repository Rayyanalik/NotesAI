
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Designed by RK with precision • Built with care</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
