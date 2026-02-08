import ContactEmail from '@/components/emails/ContactEmail';

export default function EmailPreview() {
  // Sample data for testing
  const sampleData = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+253 77 12 34 56',
    service: 'Billet d\'avion',
    message: 'Bonjour,\n\nJe souhaiterais réserver un vol pour Djibouti le mois prochain. Pourriez-vous me donner plus d\'informations sur les tarifs et les disponibilités?\n\nMerci!'
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Email Template Preview</h1>
      <p className="mb-4 text-gray-600">
        This is how your contact form emails will look:
      </p>
      <div className="border rounded-lg overflow-hidden">
        <ContactEmail {...sampleData} />
      </div>
    </div>
  );
}
