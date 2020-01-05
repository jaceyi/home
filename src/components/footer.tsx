/** @jsx jsx */
import { Footer as ThemeFooter, useColorMode, jsx } from 'theme-ui';

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  const toggleColorMode = () => {
    setColorMode(isDark ? 'light' : 'dark');
  };

  return (
    <ThemeFooter>
      <button
        sx={{
          variant: 'buttons.toggle',
          fontWeight: 'semibold',
          display: 'block',
          mx: 'auto',
          mb: 3,
          outline: `none`,
          transition: `all 1.5s`,
          borderRadius: 2,
          '&:hover': {
            borderRadius: `9em`
          }
        }}
        onClick={toggleColorMode}
        type="button"
        aria-label="Toggle dark mode"
      >
        {isDark ? 'Light' : 'Dark'}
      </button>
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
    </ThemeFooter>
  );
};

export default Footer;
