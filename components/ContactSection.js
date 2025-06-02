import { useState } from 'react';
import { useTheme } from './ThemeContext';

const ContactSection = ({ 
  pageType = 'community', // 'community' or 'registration'
  sectionTitle = 'Join Us',
  sectionDescription = 'Become a Member',
  formSource = 'community_page',
  includeMembershipType = true,
  useSimpleLayout = false
}) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/assets/img/logolight.png' : '/assets/img/logodark.png';
  
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    stateOfResidence: '',
    phoneNumber: '',
    stateOfOrigin: '',
    dateOfBirth: '',
    gender: '',
    lga: '',
    membership: 'Regular Member'
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false,
    errorMessage: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // State for controlling the modal visibility
  const [showModal, setShowModal] = useState(false);
  
  // Function to handle opening and closing the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  // Handler for closing the modal and resetting the form
  const closeModalAndResetForm = () => {
    setShowModal(false);
    // Reset the form state
    setFormState({
      fullName: '',
      email: '',
      stateOfResidence: '',
      phoneNumber: '',
      stateOfOrigin: '',
      dateOfBirth: '',
      gender: '',
      lga: '',
      membership: 'Regular Member'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true, error: false });

    try {
      // Google Apps Script web app URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbyHm8StOYZGk4PKM-h_ugxlHfvgJIGL-Z7a39xUgAa4Bx4WWwClOlhgtXflHLm6Uh9s/exec';
      
      // Add timestamp to the form data
      const formDataWithTimestamp = {
        ...formState,
        timestamp: new Date().toISOString(),
        formSource: formSource // To identify which form was used
      };
      
      // Create form data
      const formData = new FormData();
      Object.entries(formDataWithTimestamp).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Submit data
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      // Try to parse JSON response (if available)
      let result;
      try {
        result = await response.json();
        console.log('Success:', result);
      } catch (parseError) {
        console.log('Success (no JSON response)');
      }
      
      // Update form status
      setFormStatus({ loading: false, error: false, success: true });
      
      // Show the congratulations modal on successful submission
      setShowModal(true);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        loading: false,
        error: true,
        success: false,
        errorMessage: error.message || 'Form submission failed. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="contact section">
      {/* Congratulations Modal */}
      {showModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050
        }}>
          <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{
            width: '90%',
            maxWidth: '500px',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,.2)'
          }}>
            <div className="text-center mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
              <h2 className="mt-3">Congratulations!</h2>
              <p className="lead">Thank you for joining the Arewa19 community! Your membership application has been submitted successfully.</p>
              <p>One of our representatives will contact you soon with more information.</p>
            </div>
            <div className="d-flex justify-content-center">
              <button 
                className="btn btn-primary px-4 py-2" 
                onClick={closeModalAndResetForm}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>{sectionTitle}</h2>
        <div>
          <span>{pageType === 'community' ? 'Become a member' : 'Join our community'}</span> 
          <span className="description-title">{pageType === 'community' ? 'Apply To Join' : 'Register Now'}</span>
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {!useSimpleLayout && (
            <>
              <div className="col-lg-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-map"></i>
                  <h3>Our Address</h3>
                  <p>Plot 11277 Road, Ceddi Plaza, Central Business District, Abuja, Nigeria.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>info@arewa19pyramid.com</p>
                  <p>contact@arewa19pyramid.com</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>+234 814 199 3707</p>
                  <p>+234 70 Arewa19Pyramid</p>
                </div>
              </div>
            </>
          )}
            
          {useSimpleLayout && (
            <>
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay="200" style={{ alignItems: 'center', padding: 0 }}>
                      <img src={logoSrc} alt="Arewa19 Logo" style={{ height: 100 }} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay="300">
                      <i className="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>+234 814 199 3707</p>
                      <p>+234 70 Arewa19Pyramid</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay="400">
                      <i className="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>info@arewa19pyramid.com</p>
                      <p>contact@arewa19pyramid.com</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay="500" style={{ alignItems: 'center', padding: 0 }}>
                      <i className="bi bi-geo-alt"></i>
                      <h3>Find Us</h3>
                      <p>Plot 11277 Road, Ceddi Plaza</p>
                      <p>Abuja, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="col-lg-12">
            <div className="form-container">
              {!formStatus.success ? (
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="card p-4 shadow-sm" data-aos="fade-up" style={{ backgroundColor: theme === 'dark' ? 'var(--surface-color)' : 'white' }}>
                      <div className="card-body">
                        <h4 className="mb-4 text-center">
                          <img src={logoSrc} alt="Arewa19 Logo" style={{ height: 60, marginBottom: '15px' }} className="d-block mx-auto" />
                          Join Arewa19 Pyramid
                        </h4>
                        
                        {formStatus.error && (
                          <div className="alert alert-danger" role="alert">
                            {formStatus.errorMessage || 'An error occurred. Please try again.'}
                          </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label htmlFor="fullName" className="form-label">Full Name</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="fullName" 
                                name="fullName"
                                value={formState.fullName}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="email" className="form-label">Email Address</label>
                              <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                              <input 
                                type="tel" 
                                className="form-control" 
                                id="phoneNumber" 
                                name="phoneNumber"
                                value={formState.phoneNumber}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="stateOfResidence" className="form-label">State of Residence</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="stateOfResidence" 
                                name="stateOfResidence"
                                value={formState.stateOfResidence}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="stateOfOrigin" className="form-label">State of Origin</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="stateOfOrigin" 
                                name="stateOfOrigin"
                                value={formState.stateOfOrigin}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                              <input 
                                type="date" 
                                className="form-control" 
                                id="dateOfBirth" 
                                name="dateOfBirth"
                                value={formState.dateOfBirth}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="gender" className="form-label">Gender</label>
                              <select 
                                className="form-select" 
                                id="gender" 
                                name="gender"
                                value={formState.gender}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="lga" className="form-label">LGA (Local Government Area)</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="lga" 
                                name="lga"
                                value={formState.lga}
                                onChange={handleChange}
                                required 
                              />
                            </div>
                            
                            {includeMembershipType && (
                              <div className="col-12">
                                <label htmlFor="membership" className="form-label">Membership Type</label>
                                <select 
                                  className="form-select" 
                                  id="membership" 
                                  name="membership"
                                  value={formState.membership}
                                  onChange={handleChange}
                                >
                                  <option value="Regular Member">Regular Member</option>
                                  <option value="Volunteer">Volunteer</option>
                                  <option value="Donor">Donor</option>
                                  <option value="Partner">Partner Organization</option>
                                </select>
                              </div>
                            )}
                            
                            <div className="col-12 mt-4 text-center">
                              <button 
                                type="submit" 
                                className="btn btn-lg px-5"
                                style={{
                                  backgroundColor: 'var(--accent-color)',
                                  color: 'var(--contrast-color)',
                                  border: 'none'
                                }}
                                disabled={formStatus.loading}
                              >
                                {formStatus.loading ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Submitting...
                                  </>
                                ) : 'Submit Application'}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="thank-you-section text-center py-5">
                  <div className="card p-5 shadow" data-aos="fade-up">
                    <h2 className="mb-4">Thank you for your submission!</h2>
                    <p className="mb-4">We appreciate your interest in joining the Arewa19 Pyramid community. Our team will review your application and get back to you soon.</p>
                    <div className="text-center">
                      <img src={logoSrc} alt="Arewa19 Logo" style={{ height: 100, margin: '20px auto' }} className="d-block mx-auto" />
                    </div>
                    <p>Together, we can create lasting change in Northern Nigeria!</p>
                    <button 
                      className="btn btn-primary mt-3" 
                      onClick={() => setFormStatus({...formStatus, success: false})}
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
