import { useState } from 'react';
import { useTheme } from './ThemeContext';

const ContactSection = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true, error: false });

    try {
      // Replace this URL with your Google Apps Script web app URL when you have it
      const scriptURL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';
      
      // Add timestamp to the form data
      const formDataWithTimestamp = {
        ...formState,
        timestamp: new Date().toISOString(),
        formSource: 'community_page' // To identify which form was used
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
      
      if (response.ok) {
        // Reset form and show success message
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
        setFormStatus({
          loading: false,
          error: false,
          success: true,
          errorMessage: ''
        });
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        loading: false,
        error: true,
        success: false,
        errorMessage: 'Failed to submit the form. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Join Us</h2>
        <div><span>Interested in joining the movement?</span> <span className="description-title">Sign Up Now!</span></div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-2">
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
