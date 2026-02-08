'use client';

import { useState, useRef } from 'react';
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        formRef.current?.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            placeholder="votre@email.com"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            placeholder="+253 XX XX XX XX"
          />
        </div>

        {/* Service */}
        <div className="mb-6">
          <label
            htmlFor="service"
            className="block text-gray-700 font-semibold mb-2"
          >
            Service souhaité
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          >
            <option value="">Sélectionnez un service</option>
            <option value="flight">Billet d&apos;avion</option>
            <option value="hotel">Réservation d&apos;hôtel</option>
            <option value="excursion">Excursion</option>
            <option value="visa">Facilitation de visa</option>
            <option value="package">Package complet</option>
          </select>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition resize-none"
            placeholder="Parlez-nous de votre projet de voyage..."
          />
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Message envoyé avec succès! Nous vous répondrons bientôt.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ Erreur lors de l&apos;envoi. Veuillez réessayer.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-main text-white py-4 rounded-lg hover:bg-blue-dark transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg border-2 border-blue-main hover:border-blue-dark hover:shadow-xl hover:shadow-blue-main/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
