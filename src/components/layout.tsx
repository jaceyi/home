/** @jsx jsx */
import * as React from 'react';
import { Global } from '@emotion/core';
import { Styled, jsx } from 'theme-ui';
import css from '@styled-system/css';

type LayoutProps = { children?: React.ReactNode; className?: string };

const Layout = ({ children }: LayoutProps) => (
  <Styled.root data-testid="theme-root">
    <Global
      styles={css({
        '*': {
          boxSizing: 'inherit',
          '&:before': {
            boxSizing: 'inherit'
          },
          '&:after': {
            boxSizing: 'inherit'
          }
        },
        html: {
          fontSize: '18px'
        },
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backgroundColor: 'background'
        },
        '::selection': {
          backgroundColor: 'primary',
          color: 'white'
        }
      })}
    />
    <main>{children}</main>
  </Styled.root>
);

export default Layout;
