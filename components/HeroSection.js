import { useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="hero" className="hero section dark-background">
      <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-item active">
          <img src="/assets/img/slider1.jpg" alt="Grassroot Development" />
          <div className="carousel-container">
            <h2>Grassroot Development<br /></h2>
            <Link href="#about" className="btn-get-started">Read More</Link>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/assets/img/slider2.jpg" alt="Northern Infrastructure" />
          <div className="carousel-container">
            <h2>Northern Infrastructure</h2>
            <Link href="#about" className="btn-get-started">Read More</Link>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/assets/img/slider3.jpg" alt="Literacy and Equality" />
          <div className="carousel-container">
            <h2>Literacy and Equality</h2>
            <Link href="#about" className="btn-get-started">Read More</Link>
          </div>
        </div>

        <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </a>

        <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </a>

        <ol className="carousel-indicators"></ol>
      </div>
    </section>
  );
};

export default HeroSection;
