/** @jsx jsx */
import * as React from 'react';
import { ParallaxLayer } from 'react-spring/renderprops-addons.cjs';
import { jsx } from 'theme-ui';

type ContentProps = {
  speed: number;
  offset: number;
  children?: React.ReactNode;
  factor?: number;
};

const Content = ({ speed, offset, children, factor }: ContentProps) => (
  <ParallaxLayer
    sx={{
      padding: [3, 4, 4, 5],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}
    speed={speed}
    offset={offset}
    factor={factor || 1}
  >
    {children}
  </ParallaxLayer>
);

export default Content;
