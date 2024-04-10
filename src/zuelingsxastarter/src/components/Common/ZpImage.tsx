/**
 * Component use for rendering responsive image
 */

import { Field, ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface IZpImage {
  image: Field<ImageField>;
  className?: string;
  alt?: string;
  style?: object;
  small?: boolean;
  useMaxHeight?: boolean;
  width?: number;
  height?: number;
}

const ZpImage = (props: IZpImage): JSX.Element => {
  const { image, className, alt, style, small, useMaxHeight, width, height } = props;

  let br1, br2, br3; // width break points

  if (small) {
    [br1, br2, br3] = [300, 900, 1140];
  } else if (width) {
    [br1, br2, br3] = [width, width, width];
  } else {
    [br1, br2, br3] = [300, 1000, 1920];
  }

  if (!width) {
    return (
      <JssImage
        className={className}
        alt={alt}
        style={style}
        field={image?.value}
        srcSet={[{ mw: br1 }, { mw: br2 }, { mw: br3 }]}
        sizes={`(max-width: ${br1}px) ${br1}px, (max-width: ${br2}px) ${br2}px, 100vw`}
      />
    );
  }

  const srcSetVal = useMaxHeight
    ? [{ mh: br1 }, { mh: br2 }, { mh: br3 }]
    : [{ mw: br1 }, { mw: br2 }, { mw: br3 }];
  return (
    <JssImage
      className={className}
      alt={alt}
      style={style}
      width={useMaxHeight ? null : width}
      height={height}
      field={image?.value}
      srcSet={srcSetVal}
      sizes={`(max-width: ${br1}px) ${br1}px, (max-width: ${br2}px) ${br2}px, 100vw`}
    />
  );
};

export default ZpImage;
