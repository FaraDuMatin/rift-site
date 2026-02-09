"use client";
import { Plane, Hotel, Compass, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import Card from './ui/Card';

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: "Billets d'Avion",
      description: "Réservez vos vols vers et depuis l'Afrique de l'Est aux meilleurs tarifs. Nous travaillons avec toutes les compagnies aériennes majeures.",
      features: [
        'Tarifs compétitifs',
        'Réservation facile',
        'Support 24/7',
        'Modifications flexibles'
      ],
      button: {
        text: 'Réserver un vol',
        href: '/vols'
      }
    },
    {
      icon: Hotel,
      title: "Réservations d'Hôtels",
      description: "Large sélection d'hébergements pour tous les budgets, des hôtels de luxe aux lodges authentiques",
      features: [
        'Hôtels vérifiés',
        'Meilleurs prix garantis',
        'Annulation gratuite',
        'Paiement sécurisé'
      ]
    },
    {
      icon: Compass,
      title: "Excursions",
      description: "Découvrez les merveilles de l'Afrique de l'Est avec nos excursions guidées et circuits sur mesure",
      features: [
        'Guides expérimentés',
        'Circuits personnalisés',
        'Petits groupes',
        'Expériences authentiques'
      ]
    },
    {
      icon: FileText,
      title: "Visa",
      description: "Simplifiez vos démarches administratives. Nous facilitons l'obtention de votre visa pour l'Afrique de l'Est",
      features: [
        'Assistance complète',
        'Traitement rapide',
        'Suivi en temps réel',
        'Taux de réussite élevé'
      ],
      button: {
        text: 'Je fais ma demande de visa',
        href: '/visa'
      }
    }
  ];

  return (
    <section id="services" className="py-20 px-12 bg-gray-50">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Nos Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une gamme complète de services pour rendre votre voyage en Afrique de l&apos;Est inoubliable
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <Card key={index} {...service} />
        ))}
      </div>
    </section>
  );
}