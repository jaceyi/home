/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import Hero from './views/Hero';
import About from './views/About';
import Contact from './views/Contact';

function App() {
  return (
    <div
      css={css`
        & > * {
          height: 100vh;
          position: relative;
        }
      `}
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
      <Hero />
      <About />
      <Contact />
    </div>
  );
}

export default App;
