import Link from 'next/link';

const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action section dark-background">
      <img src="/assets/img/portfolio/IMG_3499.JPG" alt="Call to Action" />
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>Join Our Community</h3>
              <p>Be part of the movement that's transforming Northern Nigeria. Together, we can create a better future for all.</p>
              <Link href="/community#contact" className="cta-btn">Join Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
