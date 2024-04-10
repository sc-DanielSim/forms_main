import { useEffect, useState } from 'react';
import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpLink from 'components/Common/ZpLink';

interface IFloatingCTA {
  fields?: {
    ButtonName: Field<string>;
    ButtonUrl: LinkField;
    IsShow: Field<boolean>;
  };
}

export default function FloatingCTA({ fields }: IFloatingCTA) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show or hide the button based on scroll position
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!fields) {
    return <></>;
  }

  return (
    <>
      {fields?.IsShow.value && (
        <div className="zp-corporate-floating-cta">
          <ZpLink
            btnLink={fields?.ButtonUrl}
            className={`floating-cta-link ${isVisible ? 'is-visible' : ''}`}
          >
            <Text field={fields?.ButtonName} />
          </ZpLink>
        </div>
      )}
    </>
  );
}
