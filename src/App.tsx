import * as React from 'react';
import { Parallax } from 'react-spring/renderprops-addons.cjs';
import Layout from './components/layout';
import Hero from './views/hero';
import About from './views/about';
import Contact from './views/contact';

function App() {
  return (
    <Layout>
      <Parallax pages={3}>
        <Hero offset={0} />
        <About offset={1} />
        <Contact offset={2} />
      </Parallax>
    </Layout>
  );
}

export default App;
