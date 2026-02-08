import Image from "next/image";
import Hero from "../components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <Contact />
    </>
  );
}
