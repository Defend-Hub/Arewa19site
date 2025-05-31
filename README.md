# Arewa19 Pyramid - Next.js Website

This is the Next.js version of the Arewa19 Pyramid website, converted from the original HTML and Bootstrap CSS implementation.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/pages` - Contains all Next.js pages
  - `index.js` - Homepage
  - `gallery.js` - Gallery page
  - `community.js` - Community page
  - `404.js` - Custom 404 page
  - `_app.js` - Custom App component
  - `_document.js` - Custom Document component

- `/components` - Reusable React components
  - `Header.js` - Navigation header
  - `Footer.js` - Page footer
  - `HeroSection.js` - Hero carousel
  - `AboutSection.js` - About section
  - `StatsSection.js` - Statistics section
  - `ServicesSection.js` - Services/Ideology section
  - `Banner.js` - Scrolling banner
  - `CallToAction.js` - CTA section
  - `TestimonialsSection.js` - Testimonials section
  - `GallerySection.js` - Gallery grid with filtering
  - `TeamSection.js` - Team members display
  - `ContactSection.js` - Contact form

- `/styles` - CSS styles
  - `globals.css` - Global styles
  - `404.module.css` - Styles for the 404 page

- `/public` - Static assets
  - `/assets` - Images, CSS, and JavaScript files
  - `/assets/vendor` - Third-party libraries

## Notes on Conversion

1. The website maintains all the original design and functionality
2. CSS is imported from the original files
3. Third-party libraries (Bootstrap, AOS, GLightbox, etc.) are now properly integrated with Next.js
4. All links use Next.js `Link` component for better performance
5. JavaScript functionality is properly initialized using React's `useEffect` hooks

## Deployment

To build for production:

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm run start
# or
yarn start
```

## Firebase Deployment (Optional)

If you want to continue using Firebase for deployment, install the Firebase CLI:

```bash
npm install -g firebase-tools
```

Then deploy:

```bash
firebase deploy
```
