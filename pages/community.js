import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';

export default function Community() {
  return (
    <div className="starter-page-page">
      <Head>
        <title>Community - Arewa19 Pyramid</title>
        <meta name="description" content="Join the Arewa19 community and be part of the movement transforming Northern Nigeria" />
      </Head>

      <Header />
      
      <main className="main">
        {/* Page Title with margin for header */}
        <div style={{ marginTop: '60px' }}>
          <Banner />
        </div>
        
        <TeamSection />
        <ContactSection 
          pageType="community"
          sectionTitle="Join Us"
          sectionDescription="Become a Member"
          formSource="community_page"
          includeMembershipType={true}
          useSimpleLayout={false}
        />
      </main>

      <Footer />
    </div>
  );
}
