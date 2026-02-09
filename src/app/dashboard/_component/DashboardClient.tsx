"use client";

import { useState } from "react";
import DashboardSidebar, { TabId } from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ProfileCard from "./ProfileCard";
import FlightsComponent from "./FlightsComponent";
import VisaComponent from "./VisaComponent";
import HotelComponent from "./HotelComponents";
import ExcursionComponent from "./ExcursionComponent";

interface DashboardClientProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl?: string;
  createdAt: number;
}

export default function DashboardClient({
  firstName,
  lastName,
  email,
  imageUrl,
  createdAt,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "flights":
        return <FlightsComponent />;
      case "visa":
        return <VisaComponent />;
      case "hotels":
        return <HotelComponent />;
      case "excursions":
        return <ExcursionComponent />;
      case "dashboard":
      default:
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FlightsComponent />
              <VisaComponent />
              <HotelComponent />
              <ExcursionComponent />
            </div>

            {/* Profile sidebar */}
            <div>
              <ProfileCard
                firstName={firstName}
                lastName={lastName}
                email={email}
                imageUrl={imageUrl}
                createdAt={createdAt}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 ml-64 p-6 lg:p-8">
        <DashboardHeader firstName={firstName} imageUrl={imageUrl} />
        {renderContent()}
      </main>
    </div>
  );
}
