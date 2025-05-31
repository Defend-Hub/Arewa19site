import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

export default function ServiceDetails() {
  return (
    <div className="starter-page-page">
      <Head>
        <title>Service Details - Arewa19 Pyramid</title>
        <meta name="description" content="Detailed information about our services and activities" />
      </Head>

      <Header />
      
      <main className="main">
        {/* Page Title with margin for header */}
        <div style={{ marginTop: '60px' }}>
          <Banner />
        </div>
        
        <section className="service-details section">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-4">
                <div className="img-bg" style={{ backgroundImage: 'url(/assets/img/services.jpg)' }}></div>
              </div>

              <div className="col-lg-8">
                <h3>Our Comprehensive Approach to Arewa's Development</h3>
                <p>
                  At Arewa19 Pyramid, we implement a multi-faceted strategy to address the various challenges facing Northern Nigeria. Our approach combines grassroots community work, policy advocacy, educational initiatives, and economic empowerment programs.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span>Youth Empowerment Programs</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Women's Economic Inclusion Initiatives</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Educational Support and Scholarship Programs</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Governance and Policy Advocacy</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Community Development Projects</span></li>
                </ul>
                <p>
                  Our activities are designed to create lasting impact by addressing both immediate needs and long-term structural issues. Through community engagement and partnerships with various stakeholders, we ensure that our programs are relevant, effective, and sustainable.
                </p>
                <p>
                  We believe in the power of collaboration and welcome partnerships with organizations that share our vision for a prosperous and united Northern Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
