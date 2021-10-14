/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Background from '../components/Background';

const Contact = () => {
  return (
    <div>
      <Background
        url="https://dns.jaceyi.com/static/images/bg3.jpg"
        brightness={0.8}
      />
      <div
        css={css`
          overflow: hidden;
          padding: 0 20vw;
          height: 100%;

          @media screen and (max-width: 1000px) {
            & {
              padding: 12vw;
            }
          }
        `}
      >
        <h1
          css={css`
            margin-top: 24vh;
            font-family: inherit;
            font-weight: 700;
            line-height: 1.25;
            font-size: 5rem;
            color: #fff;

            @media screen and (max-width: 1000px) {
              & {
                font-size: 2.2rem;
                line-height: 1.6;
                margin-top: 12vh;
              }
            }
          `}
        >
          Get in touch
        </h1>
        <div
          css={css`
            color: #fff;
            line-height: 2;
            font-size: 1.5rem;
            margin-top: 3rem;

            a {
              color: #fff;
            }

            .item {
              margin: 0 8px;
            }

            @media screen and (max-width: 1000px) {
              & {
                font-size: 1rem;
              }
            }
          `}
        >
          <div>
            Say Hi or find me on other platforms:
            <a
              css={css`
                @media screen and (max-width: 380px) {
                  & {
                    margin-left: 0 !important;
                  }
                }
              `}
              className="item"
              rel="noreferrer"
              target="_blank"
              href="https://juejin.im/user/5a3b2016f265da43231b22a7"
            >
              掘金
            </a>
            &
            <a
              className="item"
              rel="noreferrer"
              target="_blank"
              href="https://github.com/jaceyi"
            >
              GitHub
            </a>
          </div>
          <div>
            Email:
            <a className="item" href="mailto:yijinchun@outlook.com">
              yijinchun@outlook.com
            </a>
          </div>
          <div>
            WeChat:
            <a
              css={css`
                position: relative;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

                &:hover .wx-qr-code {
                  display: flex;
                }

                .wx-qr-code {
                  position: absolute;
                  left: 0;
                  top: 34px;
                  width: 260px;
                  display: none;

                  img {
                    width: 100%;
                    display: block;
                    box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                    pointer-events: auto;
                  }
                }

                @media screen and (max-width: 380px) {
                  .wx-qr-code {
                    position: fixed;
                    top: 0;
                    left: 0;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.2);
                    pointer-events: none;

                    img {
                      width: 260px;
                    }
                  }
                }
              `}
              className="item"
              href="#!"
            >
              <span>jaceyi</span>
              <div className="wx-qr-code">
                <img
                  src="https://dns.jaceyi.com/static/images/wx-qr-code.jpg"
                  alt="微信二维码"
                />
              </div>
            </a>
          </div>
          <div>
            QQ:
            <a
              className="item"
              rel="noreferrer"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=6498601&site=Jace&menu=yes"
            >
              6498601
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
