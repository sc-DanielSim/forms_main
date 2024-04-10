import { CSSProperties } from 'react';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface IZpLink {
  btnLink?: LinkField;
  className?: string;
  style?: CSSProperties;
  children?: JSX.Element | string;
}
const ZpLink = (props: IZpLink): JSX.Element => {
  const target = props.btnLink?.value.target;
  const href = props.btnLink?.value.href;
  const { className, style, children } = props;

  return (
    <Link className={className} style={style} href={`${href}`} target={target}>
      {children}
    </Link>
  );
};

export default ZpLink;
