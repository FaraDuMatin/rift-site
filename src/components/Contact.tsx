'use client';

import ContactInfo from './ui/ContactInfo';
import ContactForm from './ui/ContactForm';

export default function Contact() {
  

  return (
    <section id="contact" className="py-20 bg-linear-to-b from-gray-50 to-white">
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
          <ContactInfo />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
