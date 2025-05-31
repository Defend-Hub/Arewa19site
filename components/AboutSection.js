import { useEffect } from 'react';
import Link from 'next/link';

const AboutSection = () => {
  useEffect(() => {
    // Initialize GLightbox if available
    if (typeof window !== 'undefined') {
      import('glightbox').then(({ default: GLightbox }) => {
        const glightbox = GLightbox({
          selector: '.glightbox'
        });
      }).catch(console.error);
    }
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 position-relative" data-aos="fade-up" data-aos-delay="200">
            <img src="/assets/img/about.jpg" className="img-fluid" alt="About Arewa19" />
            <a href="https://youtu.be/HhaPu3llSqg" className="glightbox pulsating-play-btn"></a>
          </div>

          <div className="col-lg-7 content ps-lg-4" data-aos="fade-up" data-aos-delay="100">
            <h3>About Us</h3>
            <p>
              A19 is a non-partisan, independent organization dedicated to addressing the pressing concerns of Northern Nigeria. Our mission is to empower the region's youth and women, driving sustainable development and good governance.
            </p>
            <ul>
              <li>
                <i className="bi bi-diagram-3"></i>
                <div>
                  <h5>Arewa Development</h5>
                  <p>We strive for comprehensive development in Northern Nigeria, tackling social, economic, and political challenges</p>
                </div>
              </li>
              <li>
                <i className="bi bi-fullscreen-exit"></i>
                <div>
                  <h5>Good Governance</h5>
                  <p>We promote transparency, accountability, and inclusive leadership, ensuring effective governance in the region</p>
                </div>
              </li>
              <li>
                <i className="bi bi-broadcast"></i>
                <div>
                  <h5>Entrepreneurship Development</h5>
                  <p>We equip women and youth with skills and resources to thrive in business, fostering economic growth</p>
                </div>
              </li>
            </ul>
            <p>
              A19 operates with a clear mission: to inspire and equip individuals with the skills, resources, and opportunities necessary to thrive in an ever-changing world. The foundation focuses on key areas such as education, economic empowerment, community development, and the promotion of good governance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
