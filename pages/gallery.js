import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import DriveGallerySection from '../components/DriveGallerySection';

export default function Gallery() {
  return (
    <div className="starter-page-page">
      <Head>
        <title>Gallery - Arewa19 Pyramid</title>
        <meta name="description" content="Explore our gallery of events and activities across Northern Nigeria" />
      </Head>

      <Header />
      
      <main className="main">
        {/* Page Title with margin for header */}
        <div style={{ marginTop: '60px' }}>
          <Banner />
        </div>
        
        {/* Gallery Section - using Google Drive images */}
        <DriveGallerySection />
      </main>

      <Footer />
    </div>
  );
}
