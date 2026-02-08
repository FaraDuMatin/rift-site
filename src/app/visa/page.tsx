'use client';

import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import VisaCard from './_component/VisaCard';

export default function VisaPage() {
  const [email, setEmail] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const visaTypes = [
    {
      title: 'Visa Touristique',
      description: 'Pour les voyages de tourisme et de loisirs',
      duration: '30 jours',
      price: '90 USD'
    },
    {
      title: "Visa d'Affaires",
      description: 'Pour les voyages professionnels et réunions',
      duration: '30 jours',
      price: '90 USD'
    },
    {
      title: 'Visa de Transit',
      description: 'Pour les escales et transits',
      duration: '3 jours',
      price: '60 USD'
    }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Email:', email, 'Create account:', createAccount);
  };

  return (
    <section id="visa" className="py-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Facilitation de Visa pour Djibouti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous vous accompagnons dans toutes vos démarches pour obtenir votre e-visa
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 1 ? 'bg-blue-main text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep >= 2 ? 'bg-blue-main' : 'bg-gray-300'
                }`}></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 2 ? 'bg-blue-main text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep >= 3 ? 'bg-blue-main' : 'bg-gray-300'
                }`}></div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 3 ? 'bg-blue-main text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
              </div>
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-between mt-4 px-2">
              <span className={`text-xs md:text-sm font-semibold ${
                currentStep >= 1 ? 'text-blue-main' : 'text-gray-500'
              }`}>
                Informations
              </span>
              <span className={`text-xs md:text-sm font-semibold ${
                currentStep >= 2 ? 'text-blue-main' : 'text-gray-500'
              }`}>
                Demandes
              </span>
              <span className={`text-xs md:text-sm font-semibold ${
                currentStep >= 3 ? 'text-blue-main' : 'text-gray-500'
              }`}>
                Documents
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Informations de Contact
            </h3>
            
            <form onSubmit={handleNext} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Create Account Checkbox */}
              <div className="bg-blue-light/20 border border-blue-main/30 rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    className="w-5 h-5 text-blue-main rounded focus:ring-blue-main mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-dark" />
                      <span className="font-semibold text-gray-900">
                        Créer un compte pour suivre vos demandes
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Accédez à votre tableau de bord et suivez l&apos;état de vos demandes en temps réel
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-main text-white px-8 py-3 rounded-lg hover:bg-blue-dark transition-colors flex items-center space-x-2 font-semibold"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Visa Types Cards */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {visaTypes.map((visa, index) => (
              <VisaCard key={index} {...visa} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
