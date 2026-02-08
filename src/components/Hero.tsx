"use client";
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/background-img.webp"
                    alt="East Africa landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-white">
                <div className="max-w-3xl">
                    {/* Location */}
                    <div className="flex items-center space-x-2 mb-6">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-light" />
                        <span className="text-base md:text-lg">
                            Djibouti - Afrique de l&apos;Est
                        </span> 
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Explorez l&apos;Afrique de l&apos;Est avec{' '}
                        <span className="text-blue-light">The Rift</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
                        Votre partenaire de confiance pour les billets d&apos;avion, réservations d&apos;hôtels,
                        excursions inoubliables et facilitation de visa dans toute l&apos;Afrique de l&apos;Est.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            className="px-8 py-4 bg-blue-light text-white text-lg font-semibold rounded-lg transition-all hover:bg-blue-main transform hover:scale-105 flex items-center justify-center space-x-2"
                            onClick={() => scrollToSection('contact')}
                        >
                            <span>Planifier mon voyage</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 text-lg font-semibold rounded-lg hover:bg-white/20 transition-all"
                        >
                            Découvrir nos services
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
};
