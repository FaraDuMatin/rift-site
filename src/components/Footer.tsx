"use client";

import { Plane, MapPin, Phone, Mail} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-bg-footer text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
              <div>
                <h3 className="text-xl font-bold">The Rift</h3>
                <p className="text-xs text-gray-400">Travel Agency</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour explorer l&apos;Afrique de
              l&apos;Est depuis Djibouti.
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Billets d&apos;Avion
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Réservations d&apos;Hôtels
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Excursions
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Facilitation de Visa
              </li>
            </ul>
          </div>

          {/* Destinations Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Djibouti
              </li>
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Éthiopie
              </li>
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Kenya
              </li>
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Tanzanie
              </li>
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Rwanda
              </li>
              <li
                onClick={() => scrollToSection("destinations")}
                className="hover:text-blue-light transition-colors cursor-pointer"
              >
                Ouganda
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-light" />
                <span>Djibouti, Afrique de l&apos;Est</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-light" />
                <span>+253 XX XX XX XX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-light" />
                <span>contact@theriftagency.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-light" />
                <span>reservation@theriftagency.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 The Rift Travel Agency. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs mt-2">theriftagency.com</p>
        </div>
      </div>
    </footer>
  );
}
