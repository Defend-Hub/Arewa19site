const ServicesSection = () => {
  return (
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Ideology</h2>
        <div><span>Our</span> <span className="description-title">Core Values</span></div>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">
            <div className="icon flex-shrink-0"><i className="bi bi-briefcase"></i></div>
            <div>
              <h4 className="title">Inclusive Empowerment</h4>
              <p className="description">''We help and support each other, making sure all members
                has an equal chance to succeed.</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="200">
            <div className="icon flex-shrink-0"><i className="bi bi-card-checklist"></i></div>
            <div>
              <h4 className="title">Integrity Driven Action</h4>
              <p className="description">- We operate with transparency, accountability and honesty
                in everything we do, always trying to do the right thing</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="300">
            <div className="icon flex-shrink-0"><i className="bi bi-bar-chart"></i></div>
            <div>
              <h4 className="title">Collective Progress</h4>
              <p className="description">'We work together as a team, believe in the power of
                collaboration and partnerships as we celebrate our success together</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="400">
            <div className="icon flex-shrink-0"><i className="bi bi-binoculars"></i></div>
            <div>
              <h4 className="title">Resilient Adaptations</h4>
              <p className="description">'We persevere in the face of challenges, learn from setbacks
                and adopt our strategies quickly in overcoming obstacles to achieve our long term
                objectives.</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="500">
            <div className="icon flex-shrink-0"><i className="bi bi-brightness-high"></i></div>
            <div>
              <h4 className="title">Knowledge Driven Impact</h4>
              <p className="description">We learn and share knowledge to make a positive impact
                in our communities.</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="600">
            <div className="icon flex-shrink-0"><i className="bi bi-calendar4-week"></i></div>
            <div>
              <h4 className="title">Community First Approach</h4>
              <p className="description">''We put the needs of our community first, and support
                each other like a family in our collective pursuit of a better society</p>
              <a href="#" className="readmore stretched-link"><span>Learn More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
