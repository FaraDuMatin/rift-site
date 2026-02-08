interface VisaCardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
}

export default function VisaCard({ title, description, duration, price }: VisaCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-blue-main transform hover:-translate-y-1">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Durée:</span>
          <span className="font-semibold">{duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Prix:</span>
          <span className="font-semibold text-blue-dark text-lg">{price}</span>
        </div>
      </div>
    </div>
  );
}
