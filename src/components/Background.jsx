/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const Background = ({ url, brightness = 1 }) => {
  return (
    <div
      css={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: url('${url}') no-repeat left center;
          background-size: cover;
          filter: brightness(${brightness});
          z-index: -1;
        `}
    />
  );
};

export default Background;
