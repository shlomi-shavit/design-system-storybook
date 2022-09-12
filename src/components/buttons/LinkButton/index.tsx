import React, { FC } from 'react';
import './LinkButton.scss';

type LinkProps = {
  label: string;
  link: string;
};

export const LinkButton: FC<LinkProps> = ( { label, link } ) => {
  return <a href={ link }>{ label }</a>;
};
