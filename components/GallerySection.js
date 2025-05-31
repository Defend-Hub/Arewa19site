import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('*');
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();
  
  const toggleModal = () => setShowModal(!showModal);
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setShowModal(false);
  };
  
  useEffect(() => {
    // Apply the active filter class to the gallery items
    if (typeof window !== 'undefined' && activeFilter) {
      const items = document.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        if (activeFilter === '*' || item.classList.contains(activeFilter.substring(1))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  }, [activeFilter]);
  
  useEffect(() => {
    // Simple lightbox effect using native JavaScript
    if (typeof window !== 'undefined') {
      const galleryLinks = document.querySelectorAll('.glightbox');
      
      galleryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Create lightbox elements
          const overlay = document.createElement('div');
          overlay.className = 'lightbox-overlay';
          overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 9999; display: flex; align-items: center; justify-content: center;';
          
          const imgContainer = document.createElement('div');
          imgContainer.style.cssText = 'position: relative; max-width: 90%; max-height: 90%;';
          
          const img = document.createElement('img');
          img.src = link.getAttribute('href');
          img.style.cssText = 'max-width: 100%; max-height: 90vh; display: block; margin: 0 auto;';
          
          const closeBtn = document.createElement('button');
          closeBtn.innerHTML = '&times;';
          closeBtn.style.cssText = 'position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;';
          
          imgContainer.appendChild(img);
          imgContainer.appendChild(closeBtn);
          overlay.appendChild(imgContainer);
          document.body.appendChild(overlay);
          
          // Close lightbox on click
          overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
          });
          
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.removeChild(overlay);
          });
          
          // Prevent clicks on image from closing lightbox
          img.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        });
      });
    }
  }, []);

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <div><span>Our</span> <span className="description-title">Activities</span></div>
        <br />
        <h2>Gallery</h2>
      </div>

      <div className="container-fluid">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <div className="text-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <button 
              className="btn btn-lg px-4" 
              onClick={toggleModal}
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'var(--contrast-color)',
                border: 'none'
              }}
            >
              <i className="bi bi-funnel me-2"></i>
              Filter by State: {activeFilter === '*' ? 'All States' : activeFilter.replace('.filter-', '').charAt(0).toUpperCase() + activeFilter.replace('.filter-', '').slice(1)}
            </button>
          </div>
          
          {/* Bootstrap Modal */}
          {showModal && (
            <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content" style={{ backgroundColor: theme === 'dark' ? 'var(--surface-color)' : 'white' }}>
                  <div className="modal-header">
                    <h5 className="modal-title">Select State</h5>
                    <button type="button" className="btn-close" onClick={toggleModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="list-group">
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '*' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('*')}
                        style={{
                          backgroundColor: activeFilter === '*' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '*' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        All States
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-adamawa' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-adamawa')}
                        style={{
                          backgroundColor: activeFilter === '.filter-adamawa' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-adamawa' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Adamawa
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-bauchi' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-bauchi')}
                        style={{
                          backgroundColor: activeFilter === '.filter-bauchi' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-bauchi' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Bauchi
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-benue' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-benue')}
                        style={{
                          backgroundColor: activeFilter === '.filter-benue' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-benue' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Benue
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-borno' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-borno')}
                        style={{
                          backgroundColor: activeFilter === '.filter-borno' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-borno' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Borno
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-fct' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-fct')}
                        style={{
                          backgroundColor: activeFilter === '.filter-fct' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-fct' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        FCT
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-gombe' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-gombe')}
                        style={{
                          backgroundColor: activeFilter === '.filter-gombe' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-gombe' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Gombe
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-jigawa' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-jigawa')}
                        style={{
                          backgroundColor: activeFilter === '.filter-jigawa' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-jigawa' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Jigawa
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-kaduna' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-kaduna')}
                        style={{
                          backgroundColor: activeFilter === '.filter-kaduna' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-kaduna' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Kaduna
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-kano' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-kano')}
                        style={{
                          backgroundColor: activeFilter === '.filter-kano' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-kano' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Kano
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-katsina' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-katsina')}
                        style={{
                          backgroundColor: activeFilter === '.filter-katsina' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-katsina' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Katsina
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-kebbi' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-kebbi')}
                        style={{
                          backgroundColor: activeFilter === '.filter-kebbi' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-kebbi' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Kebbi
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-kogi' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-kogi')}
                        style={{
                          backgroundColor: activeFilter === '.filter-kogi' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-kogi' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Kogi
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-kwara' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-kwara')}
                        style={{
                          backgroundColor: activeFilter === '.filter-kwara' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-kwara' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Kwara
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-nasarawa' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-nasarawa')}
                        style={{
                          backgroundColor: activeFilter === '.filter-nasarawa' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-nasarawa' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Nasarawa
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-niger' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-niger')}
                        style={{
                          backgroundColor: activeFilter === '.filter-niger' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-niger' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Niger
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-plateau' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-plateau')}
                        style={{
                          backgroundColor: activeFilter === '.filter-plateau' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-plateau' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Plateau
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-sokoto' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-sokoto')}
                        style={{
                          backgroundColor: activeFilter === '.filter-sokoto' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-sokoto' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Sokoto
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-taraba' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-taraba')}
                        style={{
                          backgroundColor: activeFilter === '.filter-taraba' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-taraba' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Taraba
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-yobe' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-yobe')}
                        style={{
                          backgroundColor: activeFilter === '.filter-yobe' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-yobe' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Yobe
                      </button>
                      <button 
                        className={`list-group-item list-group-item-action ${activeFilter === '.filter-zamfara' ? 'active' : ''}`} 
                        onClick={() => handleFilterClick('.filter-zamfara')}
                        style={{
                          backgroundColor: activeFilter === '.filter-zamfara' ? 'var(--accent-color)' : (theme === 'dark' ? 'var(--surface-color)' : 'white'),
                          color: activeFilter === '.filter-zamfara' ? 'var(--contrast-color)' : 'inherit'
                        }}
                      >
                        Zamfara
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row g-0 isotope-container" data-aos="fade-up" data-aos-delay="200">
            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-kaduna">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/IMG_3499.JPG" className="img-fluid" alt="Kaduna event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/IMG_3499.JPG" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-borno">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/maid1.jpg" className="img-fluid" alt="Borno event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/maid1.jpg" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-katsina">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/WhatsApp Image 2025-03-27 at 14.57.49_8f6c47c4.jpg" className="img-fluid" alt="Katsina event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/WhatsApp Image 2025-03-27 at 14.57.49_8f6c47c4.jpg" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-kaduna">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/kad1.jpg" className="img-fluid" alt="Kaduna event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/kad1.jpg" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-kaduna">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/IMG_3522.JPG" className="img-fluid" alt="Kaduna event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/IMG_3522.JPG" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-borno">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/maid2.jpg" className="img-fluid" alt="Borno event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/maid2.jpg" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-katsina">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/WhatsApp Image 2025-03-27 at 14.58.11_21f8ae82.jpg" className="img-fluid" alt="Katsina event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/WhatsApp Image 2025-03-27 at 14.58.11_21f8ae82.jpg" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-kaduna">
              <div className="portfolio-content h-100">
                <img src="/assets/img/portfolio/kad2.jpg" className="img-fluid" alt="Kaduna event" />
                <div className="portfolio-info">
                  <a href="/assets/img/portfolio/kad2.jpg" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                  <a href="/portfolio-details" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
