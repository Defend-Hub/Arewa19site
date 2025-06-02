import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeContext';
import Preloader from '../components/Preloader';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This effect runs client-side only
    if (typeof window === 'undefined') return;
    
    // Hide preloader after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Dynamic import of Bootstrap JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .catch(err => console.error('Failed to load Bootstrap JS:', err));
    
    // Initialize AOS
    const initAOS = async () => {
      const AOS = await import('aos');
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    };
    initAOS().catch(err => console.error('Failed to initialize AOS:', err));

    // Handle mobile nav toggle and header scroll effects
    const handleNavAndScroll = () => {
      const selectHeader = document.querySelector('#header');
      if (selectHeader) {
        const headerScrollHandler = () => {
          window.scrollY > 100 
            ? selectHeader.classList.add('sticked') 
            : selectHeader.classList.remove('sticked');
        };
        
        // Initial check
        headerScrollHandler();
        
        // Add event listener
        window.addEventListener('scroll', headerScrollHandler);
        
        // Clean up
        return () => window.removeEventListener('scroll', headerScrollHandler);
      }
    };
    
    const handleMobileNav = () => {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggle) {
        const mobileNavHandler = function(e) {
          document.querySelector('body').classList.toggle('mobile-nav-active');
          this.classList.toggle('bi-list');
          this.classList.toggle('bi-x');
        };
        
        mobileNavToggle.addEventListener('click', mobileNavHandler);
        
        // Clean up
        return () => mobileNavToggle.removeEventListener('click', mobileNavHandler);
      }
    };
    
    // Execute handlers
    const scrollCleanup = handleNavAndScroll();
    const mobileNavCleanup = handleMobileNav();
    
    // Initialize PureCounter if present on page
    const initPureCounter = () => {
      if (document.querySelector('.purecounter')) {
        // PureCounter will be loaded via Script tag in the return section
        // This will check if the global PureCounter object exists and initialize it
        if (typeof window.PureCounter !== 'undefined') {
          new window.PureCounter();
        } else {
          // If PureCounter isn't loaded yet, try again after a delay
          setTimeout(initPureCounter, 1000);
        }
      }
    };
    
    // Call with a slight delay to ensure DOM is ready
    setTimeout(initPureCounter, 500);
    
    // Clean up event listeners on component unmount
    return () => {
      if (scrollCleanup) scrollCleanup();
      if (mobileNavCleanup) mobileNavCleanup();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider>
      {loading && <Preloader />}
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta name="description" content="Arewa19 Pyramid - Empowering Northern Nigeria" />
        <meta name="keywords" content="Arewa, Development, Northern Nigeria, Community" />
      </Head>
      
      {/* External CSS using Next.js Script and Link components for better performance */}
      <Script
        id="bootstrap-cdn"
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      />
      
      {/* PureCounter script */}
      <Script
        id="purecounter-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.PureCounter = function() {
              var self = this;
              this.start = function() {
                const elements = document.querySelectorAll('.purecounter');
                elements.forEach(function(el) {
                  const start = parseInt(el.dataset.purecounterStart || 0);
                  const end = parseInt(el.dataset.purecounterEnd || 0);
                  const duration = parseInt(el.dataset.purecounterDuration || 2);
                  let count = start;
                  const step = (end - start) / (duration * 50);
                  
                  function updateCounter() {
                    count += step;
                    if ((step > 0 && count >= end) || (step < 0 && count <= end)) {
                      count = end;
                      el.textContent = end;
                      return;
                    }
                    el.textContent = Math.round(count);
                    requestAnimationFrame(updateCounter);
                  }
                  
                  requestAnimationFrame(updateCounter);
                });
              };
              this.start();
            };
          `
        }}
      />
      
      {/* External CSS stylesheets moved to _document.js */}
      
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
