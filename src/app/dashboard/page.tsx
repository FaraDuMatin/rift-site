import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Plane, FileText, MapPin, Hotel, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const quickActions = [
    {
      icon: Plane,
      title: "Réserver un vol",
      description: "Trouvez les meilleurs tarifs vers l'Afrique de l'Est",
      href: "/vols",
      color: "bg-blue-main/10 text-blue-main",
    },
    {
      icon: FileText,
      title: "Demande de Visa",
      description: "Facilitez vos démarches administratives",
      href: "/visa",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Hotel,
      title: "Réserver un hôtel",
      description: "Large choix d'hébergements vérifiés",
      href: "#",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: MapPin,
      title: "Excursions",
      description: "Découvrez nos circuits guidés",
      href: "#",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Bienvenue, {user.firstName || 'Voyageur'} 👋
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Gérez vos voyages et réservations depuis votre tableau de bord
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{action.description}</p>
              <span className="text-sm font-medium text-blue-main flex items-center gap-1 group-hover:gap-2 transition-all">
                Accéder <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-main" />
              Activité récente
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Plane className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">Aucune activité pour le moment</p>
              <p className="text-sm mt-1">Vos réservations et demandes apparaîtront ici</p>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mon profil</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {user.imageUrl && (
                  <img
                    src={user.imageUrl}
                    alt="Photo de profil"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-main/20"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Membre depuis</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Réservations</span>
                  <span className="text-gray-900 font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Demandes de visa</span>
                  <span className="text-gray-900 font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
