import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';


export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Informations de Contact
            </h3>
            
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="bg-blue-light/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-6 h-6 text-blue-dark" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                  <p className="text-gray-600">Djibouti, Afrique de l&apos;Est</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="bg-blue-light/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="w-6 h-6 text-blue-dark" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                  <p className="text-gray-600">+253 XX XX XX XX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="bg-blue-light/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-6 h-6 text-blue-dark" />
                </motion.div>
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
          </motion.div>
    )
}