import { useEffect } from 'react';

const StatsSection = () => {
  return (
    <section id="stats" className="stats section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-journal-richtext"></i>
              <span data-purecounter-start="0" data-purecounter-end="19" data-purecounter-duration="3" className="purecounter"></span>
              <p><strong>State </strong><span>Chapters</span></p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-headset"></i>
              <span data-purecounter-start="0" data-purecounter-end="74338" data-purecounter-duration="3" className="purecounter"></span>
              <p><strong>Followers</strong></p>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="stats-item">
              <img src="/assets/img/logolight.png" alt="Arewa19 Logo" style={{ height: "120px" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
