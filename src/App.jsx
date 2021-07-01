/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import { useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated } from '@react-spring/web';
import Hero from './views/Hero';
import About from './views/About';
import Contact from './views/Contact';

function App() {
  const index = useRef(0);
  const lock = useRef(false);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const addIndex = (num) => {
    const { current } = index;
    if ((num > 0 && current >= 2) || (num < 0 && current <= 0)) return;
    index.current += num;
  };
  const bind = useGesture({
    onDrag: ({
      active,
      direction: [, yDir],
      movement: [, y],
      distance,
      cancel
    }) => {
      const { clientHeight } = document.documentElement;
      if (active && distance > clientHeight / 10) {
        addIndex(yDir > 0 ? -1 : 1);
        cancel();
      }
      const currentY = 0 - index.current * clientHeight;
      api.start({
        y: !lock.current && active ? y + currentY : currentY
      });
    },
    onWheel: ({
      active,
      direction: [, yDir],
      movement: [, y],
      distance,
      wheeling
    }) => {
      const { clientHeight } = document.documentElement;
      if (lock.current) {
        if (!wheeling) {
          lock.current = false;
        }
        return;
      }
      if (distance > clientHeight / 10) {
        addIndex(yDir > 0 ? 1 : -1);
        lock.current = true;
      }

      const currentY = 0 - index.current * clientHeight;

      api.start({
        y: !lock.current && active ? -y + currentY : currentY,
        immediate: !wheeling
      });
    }
  });

  return (
    <div
      {...bind()}
      css={css`
        height: 100vh;
        overflow: hidden;

        & > div > * {
          height: 100vh;
          position: relative;

          & > * {
            height: 100%;
          }
        }
      `}
      {...bind()}
    >
      <Global
        styles={{
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
          }
        }}
      />
      <animated.div style={{ y }}>
        <Hero />
        <About />
        <Contact />
      </animated.div>
    </div>
  );
}

export default App;
