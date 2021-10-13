/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Background from '../components/Background';

function Hero() {
  return (
    <div>
      <Background url="https://dns.jaceyi.com/static/images//bg1.jpg" />
      <div
        css={css`
          overflow: hidden;
          padding-right: 6vw;
          text-align: right;
        `}
      >
        <h1
          css={css`
            margin-top: 65vh;
            font-family: inherit;
            font-weight: 700;
            line-height: 1.25;
            font-size: 6rem;
            text-shadow: rgb(255 255 255 / 15%) 0 5px 35px;
            letter-spacing: 0.025em;
            color: #fff;

            @media screen and (max-width: 1000px) {
              & {
                font-size: 3.2rem;
                line-height: 1.6;
                margin-top: 12vh;
              }
            }
          `}
        >
          Hello, I&rsquo; m Jace Yi.
        </h1>
        <p
          css={css`
            font-size: 2rem;
            color: #fff;
            margin-top: 3vh;

            @media screen and (max-width: 1000px) {
              & {
                font-size: 1rem;
              }
            }
          `}
        >
          Welcome to Jace&rsquo;s website.
        </p>
      </div>
    </div>
  );
}

export default Hero;
