import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, BookText, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Define nav links based on authentication status
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Home', path: '/' },
    ];
    
    // Add authenticated-only links
    const authLinks = isAuthenticated 
      ? [
          { name: 'Notes', path: '/notes' },
          { name: 'Create', path: '/create' },
        ]
      : [];
    
    return [...commonLinks, ...authLinks];
  };

  const navLinks = getNavLinks();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">AI</span>Notes
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[15px] left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
            
            {/* Auth buttons for desktop */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm">
                    <User size={16} className="mr-1" />
                    <span>{user?.username}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center"
                  >
                    <LogOut size={16} className="mr-1" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link to="/login" className="flex items-center">
                      <LogIn size={16} className="mr-1" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                  >
                    <Link to="/register" className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>Register</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden glass"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-secondary text-primary'
                    : 'hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {link.path === '/' && <BookText size={16} />}
                  {link.path === '/notes' && <BookText size={16} />}
                  {link.path === '/create' && <PenLine size={16} />}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            
            {/* Auth buttons for mobile */}
            {isAuthenticated ? (
              <div className="space-y-2 border-t border-border pt-4 mt-2">
                <div className="px-4 py-2 text-sm">
                  <span className="flex items-center">
                    <User size={16} className="mr-2" />
                    Signed in as {user?.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-secondary/50"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 border-t border-border pt-4 mt-2">
                <Link
                  to="/login"
                  className="flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-secondary/50"
                >
                  <LogIn size={16} className="mr-2" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-secondary/50"
                >
                  <User size={16} className="mr-2" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

