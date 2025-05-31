const TeamSection = () => {
  return (
    <section id="team" className="team section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Our Community</h2>
        <div><span>Our</span> <span className="description-title">Leadership</span></div>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="member">
              <img src="/assets/img/team/home-perfil.jpg" className="img-fluid" alt="Bello Muhammad Gidado" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Bello Muhammad Gidado</h4>
                  <span>National Chairman</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="member">
              <img src="/assets/img/team/musahud.jpg" className="img-fluid" alt="Musa Hudu" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Musa Hudu</h4>
                  <span>National Secretary</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="member">
              <img src="/assets/img/team/bar.JPG" className="img-fluid" alt="Mukhtar Usman Baba" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Mukhtar Usman Baba</h4>
                  <span>Vice Chairman</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="member">
              <img src="/assets/img/team/haj.JPG" className="img-fluid" alt="Hajiya Aisha" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Hajiya Aisha</h4>
                  <span>Women Leader</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="member">
              <img src="/assets/img/team/musa.JPG" className="img-fluid" alt="Aliyu AbdulKadir" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Aliyu AbdulKadir</h4>
                  <span>Legal Advisor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
