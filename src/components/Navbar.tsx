"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { User, Menu, X, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import LogIn from './auth/LogIn';
import SignIn from './auth/SignIn';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signin' | null>(null);
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
    <nav 
      className="fixed top-0 z-50 w-full px-6 py-1"
      style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_rift.png"
            alt="The Rift Logo"
            width={75}
            height={75}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {pathname === '/' && (
            <>
          <button
            onClick={() => scrollToSection('services')}
            className="text-black text-lg font-medium transition-colors hover:text-blue-main"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('destinations')}
            className="text-black text-lg font-medium transition-colors hover:text-blue-main"
          >
            Destinations
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-black text-lg font-medium transition-colors hover:text-blue-main"
          >
            Contact
          </button>
            </>
          )}
          
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.div
                  className="flex items-center gap-2 px-6 py-2 bg-blue-main border border-black shadow-md hover:shadow-[0_0_1px_2px_cyan] hover:border-transparent rounded-md transition-all text-white font-medium cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* <LayoutDashboard className="w-5 h-5" /> */}
                  <span className="text-lg font-medium">
                    {'Tableau de bord'}
                  </span>
                </motion.div>
              </Link>
              <motion.button
                onClick={() => signOut()}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <motion.button 
              onClick={() => setAuthModal('login')}
              className="flex items-center gap-2 px-6 py-2 bg-blue-main border border-black shadow-md hover:shadow-[0_0_1px_2px_cyan] hover:border-transparent rounded-md transition-all text-white font-medium cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="text-white w-6 h-6" />
              <span className="text-white text-lg font-medium">Connexion</span>
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
          {pathname === '/' && (
            <>
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-left text-black text-lg font-medium transition-colors hover:text-blue-main py-2"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('destinations')}
            className="block w-full text-left text-black text-lg font-medium transition-colors hover:text-blue-main py-2"
          >
            Destinations
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left text-black text-lg font-medium transition-colors hover:text-blue-main py-2"
          >
            Contact
          </button>
          </>
          )}

          {isLoaded && isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-blue-main border border-black shadow-md rounded-md text-white font-medium"
              >
                {/* <LayoutDashboard className="w-5 h-5" /> */}
                <span className="text-lg font-medium">{'Tableau de bord'}</span>
              </Link>
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-medium">Se déconnecter</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setAuthModal('login');
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-blue-main border border-black shadow-md rounded-md text-white font-medium cursor-pointer"
            >
              <User className="text-white w-6 h-6" />
              <span className="text-white text-lg font-medium">Connexion</span>
            </button>
          )}
        </div>
      )}
    </nav>

      {/* Auth Modals */}
      {authModal === 'login' && (
        <LogIn
          onClose={() => setAuthModal(null)}
          onSwitchToSignIn={() => setAuthModal('signin')}
        />
      )}
      {authModal === 'signin' && (
        <SignIn
          onClose={() => setAuthModal(null)}
          onSwitchToLogIn={() => setAuthModal('login')}
        />
      )}
    </>
  );
}
