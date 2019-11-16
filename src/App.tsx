import * as React from 'react';
import { Parallax } from 'react-spring/renderprops-addons.cjs';
import Layout from './components/layout';
import Hero from './views/hero';
import Projects from './views/projects';
import About from './views/about';
import Contact from './views/contact';

function App() {
  return (
    <Layout>
      <Parallax pages={5}>
        <Hero offset={0} />
        <Projects offset={1} />
        <About offset={3} />
        <Contact offset={4} />
      </Parallax>
    </Layout>
  );
}

export default App;
