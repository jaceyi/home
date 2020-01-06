/** @jsx jsx */
import * as React from 'react';
import { ParallaxLayer } from 'react-spring/renderprops-addons.cjs';
import { jsx } from 'theme-ui';

type DividerProps = {
  speed: number;
  offset: number;
  children?: React.ReactNode;
  bg?: string;
  fill?: string;
  clipPath?: string;
  factor?: number;
};

const Divider = ({
  speed,
  offset,
  factor,
  bg,
  fill,
  clipPath,
  children
}: DividerProps) => (
  <ParallaxLayer
    sx={{
      position: 'absolute',
      width: 'full',
      height: 'full',
      background: bg,
      backgroundColor: bg,
      '#contact-wave': {
        color: fill,
        fill: 'currentColor'
      },
      clipPath
    }}
    speed={speed}
    offset={offset}
    factor={factor || 1}
  >
    <div>{children}</div>
  </ParallaxLayer>
);

export default Divider;
