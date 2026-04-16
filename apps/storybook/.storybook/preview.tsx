import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@dengsinan/ui';
import type { ThemeMode } from '@dengsinan/ui';

const THEME_MODES: ThemeMode[] = ['light', 'dark'];

const preview: Preview = {
  globalTypes: {
    themeMode: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: THEME_MODES.map(m => ({ value: m, title: m })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    themeMode: 'light' satisfies ThemeMode,
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.themeMode ?? 'light') as ThemeMode;
      return (
        <ThemeProvider mode={mode}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
