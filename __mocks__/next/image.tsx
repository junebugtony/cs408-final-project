// __mocks__/next/image.tsx
import React from 'react';

const Image = ({ fill, ...props }: any) => {
  if (fill) {
    props.style = { ...props.style, objectFit: 'cover' };  // Handle fill property here
  }
  return <img {...props} alt={props.alt || ''} />;
};

export default Image;
