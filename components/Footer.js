import Link from 'next/link';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  // Since the footer has a dark background by default, we use the light logo by default
  // But we'll switch if the theme changes and the CSS background changes
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <img src="/assets/img/logolight.png" alt="Arewa19 Logo" />
            </Link>
            <p>A19 is a non-partisan, independent organization dedicated to addressing the pressing concerns of Northern Nigeria. Our mission is to empower the region's youth and women, driving sustainable development and good governance.</p>
            <div className="social-links d-flex mt-4">
              <a href="https://twitter.com/arew19"><i className="bi bi-twitter"></i></a>
              <a href="https://www.facebook.com/profile.php?id=100083345650636"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/arewa19_official/"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#about">About us</Link></li>
              <li><Link href="/#services">Activities</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/community">Community</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Join Us</h4>
            <ul>
              <li><Link href="/community#contact">Membership</Link></li>
              <li><Link href="/community#contact">Volunteer</Link></li>
              <li><Link href="/community#contact">Donate</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              Kaduna, Nigeria<br />
              <strong>Email:</strong> arewa19pyramid@gmail.com<br />
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>&copy; {new Date().getFullYear()} <span>Arewa19 Pyramid</span>. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
