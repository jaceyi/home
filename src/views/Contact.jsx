/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/react';
import Background from '../components/Background';

const Contact = () => {
  return (
    <div>
      <Background
        url="https://dns.jaceyi.com/static/images//bg3.jpg"
        brightness={0.8}
      />
      <div
        css={css`
          overflow: hidden;
          padding: 0 20vw;

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
            <ClassNames>
              {({ css, cx }) => (
                <a
                  rel="noreferrer"
                  className={cx(
                    'item',
                    css`
                      @media screen and (max-width: 380px) {
                        & {
                          margin-left: 0 !important;
                        }
                      }
                    `
                  )}
                  target="_blank"
                  href="https://juejin.im/user/5a3b2016f265da43231b22a7"
                >
                  掘金
                </a>
              )}
            </ClassNames>
            &
            <a
              rel="noreferrer"
              className="item"
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
            WeChat:<span className="item">jaceyi</span>
          </div>
          <div>
            QQ:<span className="item">6498601</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
