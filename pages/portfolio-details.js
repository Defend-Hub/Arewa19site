import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

export default function PortfolioDetails() {
  return (
    <div className="starter-page-page">
      <Head>
        <title>Portfolio Details - Arewa19 Pyramid</title>
        <meta name="description" content="Detailed view of our activities and projects across Northern Nigeria" />
      </Head>

      <Header />
      
      <main className="main">
        {/* Page Title with margin for header */}
        <div style={{ marginTop: '60px' }}>
          <Banner />
        </div>
        
        <section className="portfolio-details section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/assets/img/portfolio/IMG_3499.JPG" alt="Portfolio Image" />
                    </div>
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="portfolio-description">
                  <h2>Community Outreach Event</h2>
                  <p>
                    This outreach event was organized to engage with local communities, understand their needs, and provide support where necessary. Through such events, we aim to foster unity, promote development, and address pressing issues facing Northern Nigeria.
                  </p>
                  <p>
                    Our team worked closely with community leaders to ensure maximum impact and sustainable results. These activities align with our core mission of empowering youths and women across the region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
