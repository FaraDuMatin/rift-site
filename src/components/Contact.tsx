'use client';

import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à partir à l&apos;aventure ? Nous sommes là pour vous accompagner
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Informations de Contact
            </h3>
            
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-light/30 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                  <p className="text-gray-600">Djibouti, Afrique de l&apos;Est</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-light/30 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                  <p className="text-gray-600">+253 XX XX XX XX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-light/30 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">contact@theriftagency.com</p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium text-blue-dark">Réservations:</span>{' '}
                    reservation@theriftagency.com
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-blue-light/20 border-l-4 border-blue-dark p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Horaires d&apos;ouverture
              </h4>
              <p className="text-gray-700">Lundi - Vendredi: 8h00 - 18h00</p>
              <p className="text-gray-700">Samedi: 9h00 - 14h00</p>
              <p className="text-gray-700">Dimanche: Fermé</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-main text-white py-4 rounded-lg hover:bg-blue-dark transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg border-2 border-blue-main hover:border-blue-dark hover:shadow-xl hover:shadow-blue-main/30 transform hover:-translate-y-0.5"
              >
                <span>Envoyer le message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
