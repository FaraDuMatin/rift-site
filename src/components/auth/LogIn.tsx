'use client';

import { useState } from 'react';
import { Mail, Lock, X } from 'lucide-react';

interface LogInProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export default function LogIn({ onClose, onSwitchToSignIn }: LogInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual authentication
    console.log('Login:', { email, password });
    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-gray-700 font-semibold mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              id="login-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              placeholder="votre@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-gray-700 font-semibold mb-2">
              <Lock className="w-4 h-4 inline mr-1" />
              Mot de passe
            </label>
            <input
              type="password"
              id="login-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-main text-white py-3 rounded-lg hover:bg-blue-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Switch to Sign In */}
        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-main hover:text-blue-dark font-semibold"
          >
            Je n&apos;ai pas de compte
          </button>
        </div>
      </div>
    </div>
  );
}
