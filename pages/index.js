import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Banner from '../components/Banner';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CallToAction from '../components/CallToAction';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactInfo from '../components/ContactInfo';

export default function Home() {
  useEffect(() => {
    // Any page-specific JavaScript can go here
    
    // Initialize AOS again for this specific page if needed
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.refresh();
    }
  }, []);

  return (
    <div className="index-page">
      <Head>
        <title>Index - Arewa19 Pyramid</title>
        <meta name="description" content="Arewa19 Pyramid - Empowering Northern Nigeria through grassroots development" />
      </Head>

      <Header />
      
      <main className="main">
        <HeroSection />
        <StatsSection />
        <Banner />
        <AboutSection />
        <ServicesSection />
        <CallToAction />
        <TestimonialsSection />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  );
}
