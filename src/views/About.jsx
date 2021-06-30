/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Background from '../components/Background';

const About = () => {
  return (
    <div>
      <Background url="/static/images/bg2.jpg" brightness={0.9} />
      <div
        css={css`
          overflow: hidden;
          padding: 0 10vw;
        `}
      >
        <h2
          css={css`
            margin-top: 28vh;
            font-family: inherit;
            font-weight: 700;
            line-height: 1.25;
            font-size: 5rem;
            color: #fff;
            margin-bottom: 4vh;

            @media screen and (max-width: 1000px) {
              & {
                font-size: 3.2rem;
                line-height: 1.6;
                margin-top: 14vh;
                margin-bottom: 10vh;
              }
            }
          `}
        >
          About
        </h2>
        <div
          css={css`
            color: #fff;
            line-height: 2;
            font-size: 1.4rem;

            @media screen and (max-width: 1000px) {
              & {
                font-size: 1rem;
              }
            }
          `}
        >
          <p>你好，我叫易进春，家乡陕西，现在在上海从事前端开发相关工作。</p>
          <p>
            平时喜欢游泳、打台球、打羽毛球、玩VR、画画、坐过山车，有兴趣相投的朋友加个联系方式有空一起玩呀~
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
