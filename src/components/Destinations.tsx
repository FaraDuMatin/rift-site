import Destination from './ui/Destination';

export default function Destinations() {
  const destinations = [
    {
      name: 'Djibouti',
      description: 'Découvrez le Lac Assal, le Lac Abbé et les plages de sable blanc',
      imageUrl: "/background-img.webp",
      highlights: ['Lac Assal', 'Lac Abbé', 'Plongée mer Rouge'],
      href: '/destinations/djibouti'
    },
    {
      name: 'Éthiopie',
      description: "Explorez l'histoire ancienne et les paysages spectaculaires du Simien",
      imageUrl: "/background-img.webp",
      highlights: ['Lalibela', 'Simien Mountains', 'Axoum'],
      href: '/destinations/ethiopie'
    },
    {
      name: 'Kenya',
      description: 'Safaris inoubliables dans le Masai Mara et plages de Mombasa',
      imageUrl: "/background-img.webp",
      highlights: ['Masai Mara', 'Amboseli', 'Mombasa'],
      href: '/destinations/kenya'
    },
    {
      name: 'Tanzanie',
      description: 'Le Kilimandjaro, Zanzibar et le cratère du Ngorongoro',
      imageUrl: "/background-img.webp",
      highlights: ['Kilimandjaro', 'Zanzibar', 'Serengeti'],
      href: '/destinations/tanzanie'
    },
    {
      name: 'Rwanda',
      description: 'Rencontrez les gorilles de montagne dans les forêts luxuriantes',
      imageUrl: "/background-img.webp",
      highlights: ['Volcanoes NP', 'Lac Kivu', 'Kigali'],
      href: '/destinations/rwanda'
    },
    {
      name: 'Ouganda',
      description: "La perle de l'Afrique avec ses parcs nationaux exceptionnels",
      imageUrl: "/background-img.webp",
      highlights: ['Bwindi', 'Queen Elizabeth', 'Kampala'],
      href: '/destinations/ouganda'
    }
  ];

  return (
    <section id="destinations" className="py-20 px-12 bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Destinations en Afrique de l&apos;Est
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explorez les pays fascinants de l&apos;Afrique de l&apos;Est avec nos circuits organisés
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {destinations.map((destination, index) => (
          <Destination key={index} {...destination} />
        ))}
      </div>
    </section>
  );
}