import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import styles from '../styles/Preloader.module.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/assets/img/logolight.png' : '/assets/img/logodark.png';
  
  useEffect(() => {
    // Hide preloader after page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderContent}>
        <img 
          src={logoSrc} 
          alt="Arewa19 Logo" 
          className={styles.pulsingLogo}
        />
      </div>
    </div>
  );
};

export default Preloader;
