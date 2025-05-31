import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeContext';

const ContactInfo = () => {
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
    lga: ''
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
    setFormStatus({ loading: true, error: false, success: false });

    try {
      // Replace this URL with your Google Apps Script web app URL when you have it
      const scriptURL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';
      
      // Add timestamp to the form data
      const formDataWithTimestamp = {
        ...formState,
        timestamp: new Date().toISOString(),
        formSource: 'registration_page' // To identify which form was used
      };
      
      // Create form data
      const formData = new FormData();
      Object.entries(formDataWithTimestamp).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Submit data to Google Sheets
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Reset the form on success
        setFormState({
          fullName: '',
          email: '',
          stateOfResidence: '',
          phoneNumber: '',
          stateOfOrigin: '',
          dateOfBirth: '',
          gender: '',
          lga: ''
        });
        setFormStatus({ loading: false, error: false, success: true });
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
        <h2>Registration</h2>
        <div><span>Join our community</span> <span className="description-title">Register Now</span></div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
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
                  <img src={logoSrc} alt="Arewa19 Logo" style={{ height: 100 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <input 
                    type="text" 
                    name="fullName" 
                    className="form-control" 
                    placeholder="Full Name" 
                    required
                    value={formState.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Email Address" 
                    required
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="stateOfResidence" 
                    placeholder="State of Residence" 
                    required
                    value={formState.stateOfResidence}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6">
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    required
                    value={formState.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="stateOfOrigin" 
                    placeholder="State of Origin" 
                    required
                    value={formState.stateOfOrigin}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6">
                  <input 
                    type="date" 
                    className="form-control" 
                    name="dateOfBirth" 
                    placeholder="Date of Birth" 
                    required
                    value={formState.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6">
                  <select
                    className="form-select" 
                    name="gender" 
                    required
                    value={formState.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="col-md-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="lga" 
                    placeholder="LGA (Local Government Area)" 
                    required
                    value={formState.lga}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 text-center">
                  <div className={`loading ${formStatus.loading ? '' : 'd-none'}`}>Loading</div>
                  <div className={`error-message ${formStatus.error ? '' : 'd-none'}`}>
                    {formStatus.errorMessage || 'An error occurred. Please try again later.'}
                  </div>
                  <div className={`sent-message ${formStatus.success ? '' : 'd-none'}`}>
                    Your registration has been submitted. Thank you!
                  </div>

                  <button type="submit" disabled={formStatus.loading}>Submit Registration</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
