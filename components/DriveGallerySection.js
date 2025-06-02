import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const DriveGallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  
  // States in Northern Nigeria for filtering
  const states = [
    'all',
    'kaduna',
    'kano',
    'borno',
    'fct',
    'katsina',
    'jigawa',
    'sokoto',
    'zamfara',
    'kebbi',
    'bauchi',
    'gombe',
    'yobe',
    'adamawa',
    'taraba',
    'plateau',
    'nasarawa',
    'niger',
    'kwara',
    'kogi'
  ];
  
  const toggleModal = () => setShowModal(!showModal);
  
  const handleFilterClick = (state) => {
    setActiveFilter(state);
    setShowModal(false);
    fetchImages(state);
  };
  
  const fetchImages = async (stateFilter = 'all') => {
    try {
      setLoading(true);
      // Fetch images from the API route we created
      const response = await fetch(`/api/drive-images?state=${stateFilter}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      setImages(data.images || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images from Google Drive. Please try again later.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch images when component mounts
    fetchImages();
  }, []);
  
  useEffect(() => {
    // Setup lightbox functionality
    if (typeof window !== 'undefined') {
      const setupLightbox = () => {
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
      };
      
      // Add a small delay to ensure all images are loaded
      setTimeout(setupLightbox, 500);
    }
  }, [images]);

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <div><span>Our</span> <span className="description-title">Activities</span></div>
        <br />
        <h2>Gallery</h2>
      </div>

      <div className="container-fluid">
        <div className="isotope-layout">
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
              Filter by State: {activeFilter === 'all' ? 'All States' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </button>
          </div>
          
          {/* Bootstrap Modal for Filters */}
          {showModal && (
            <div className="modal-backdrop" 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={toggleModal}
            >
              <div className="modal-content p-4" 
                style={{
                  backgroundColor: theme === 'light' ? '#ffffff' : 'var(--background-color)',
                  color: 'var(--text-color)',
                  borderRadius: '8px',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  overflow: 'auto',
                  position: 'relative',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  border: theme === 'light' ? '1px solid #dee2e6' : 'none'
                }}
                onClick={e => e.stopPropagation()}
              >
                <div className="modal-header border-bottom mb-3">
                  <h5 className="modal-title">Filter by State</h5>
                  <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {states.map((state) => (
                      <div key={state} className="col-6 col-md-4 mb-2">
                        <button
                          onClick={() => handleFilterClick(state)}
                          className={`btn ${activeFilter === state ? 'btn-primary' : 'btn-outline-secondary'} w-100`}
                        >
                          {state === 'all' ? 'All States' : state.charAt(0).toUpperCase() + state.slice(1)}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="container">
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            </div>
          )}
          
          {/* Loading Indicator */}
          {loading && (
            <div className="container text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading gallery images from Google Drive...</p>
            </div>
          )}
          
          {/* No Images Message */}
          {!loading && images.length === 0 && !error && (
            <div className="container text-center py-5">
              <i className="bi bi-image text-muted" style={{fontSize: '3rem'}}></i>
              <p className="mt-3">No images found for this filter. Try selecting a different state.</p>
            </div>
          )}
          
          {/* Gallery Grid */}
          {!loading && images.length > 0 && (
            <div className="container-fluid">
              <div className="row gy-4">
                {images.map((image) => (
                  <div key={image.id} className="col-xl-3 col-lg-4 col-md-6 portfolio-item">
                    <div className="portfolio-content h-100">
                      <div style={{position: 'relative', width: '100%', height: '250px'}}>
                        {/* Use our direct Google Drive API proxy which handles authentication */}
                        <img
                          src={`/api/image-proxy?id=${image.id}`}
                          className="img-fluid"
                          alt={image.name || 'Arewa19 event'}
                          style={{
                            width: '100%', 
                            height: '250px', 
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                          onError={(e) => {
                            console.log(`Direct API proxy failed for: ${image.name}`);
                            // If our proxy fails, use placeholder
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="portfolio-info">
                        <a 
                          href={`/api/image-proxy?id=${image.id}`}
                          data-gallery="drive-gallery" 
                          className="glightbox preview-link"
                        >
                          <i className="bi bi-zoom-in"></i>
                        </a>
                        <span className="state-badge" style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {image.state === 'unknown' ? '' : image.state.charAt(0).toUpperCase() + image.state.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DriveGallerySection;
