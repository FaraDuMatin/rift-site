'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SignInProps {
  onClose: () => void;
  onSwitchToLogIn: () => void;
}

export default function SignIn({ onClose, onSwitchToLogIn }: SignInProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError('');

    try {
      const [firstName, ...lastParts] = fullName.trim().split(' ');
      const lastName = lastParts.join(' ') || undefined;

      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        onClose();
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Code invalide');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {verifying ? (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
              <p className="text-gray-600 mb-6">Un code a été envoyé à {email}</p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label htmlFor="verify-code" className="block text-gray-700 font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4 inline mr-1" />
                    Code de vérification
                  </label>
                  <input
                    type="text"
                    id="verify-code"
                    inputMode="numeric"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-main text-white py-3 rounded-lg hover:bg-blue-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Vérification...' : 'Vérifier'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Créer un compte</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block text-gray-700 font-semibold mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-gray-700 font-semibold mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-gray-700 font-semibold mb-2">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                </div>

                {/* Clerk bot protection */}
                <div id="clerk-captcha" />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-main text-white py-3 rounded-lg hover:bg-blue-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Création...' : 'Créer mon compte'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={onSwitchToLogIn}
                  className="text-blue-main hover:text-blue-dark font-semibold"
                >
                  J&apos;ai déjà un compte
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
