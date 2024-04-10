import React, { useEffect, useState } from 'react';

const ScrollToTopButton = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page with smooth animation
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    }
  });

  return (
    <>
      <div className="zp-corporate-scroll-to-top">
        <span
          className={`scroll-to-top-link ${isVisible ? 'is-visible' : ''}`}
          onClick={scrollToTop}
        >
          <img
            alt="scroll to top"
            className="scroll-to-top-arrow"
            src="/images/common/carat_up_white.svg"
          />
        </span>
      </div>
    </>
  );
};

export default ScrollToTopButton;
