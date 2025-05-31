import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Page Not Found - Arewa19 Pyramid</title>
      </Head>
      
      <div id="message" className={styles.message}>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p>The specified page was not found on this website. Please check the URL for mistakes and try again.</p>
        <Link href="/" className={styles.link}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
