/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import Hero from './views/hero';
import { useWheel } from 'react-use-gesture';

function App() {
  const bind = useWheel();

  return (
    <div
      css={css`
        height: 100vh;

        & > * {
          height: 100%;
        }
      `}
      {...bind()}
    >
      <Global
        styles={{
          '*': {
            margin: 0,
            padding: 0
          }
        }}
      />
      <Hero />
    </div>
  );
}

export default App;
