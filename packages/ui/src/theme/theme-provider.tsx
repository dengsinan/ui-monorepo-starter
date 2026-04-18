import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import { ThemeModeContext, ThemeProviderContext } from './theme-context';
import type { ThemeMode, ThemeProviderProps } from './types';
import merge from 'lodash-es/merge';
import defaultThemeDark from './default/default-theme-dark';
import defaultThemeLight from './default/default-theme-light';

const NESTED_MARKER = { nested: true } as const;

const builtinThemes: Record<ThemeMode, ThemeConfig> = {
  light: defaultThemeLight,
  dark: defaultThemeDark,
};

export function ThemeProvider({
  children,
  mode: controlledMode,
  defaultMode = 'light',
  onModeChange,
  theme,
}: ThemeProviderProps) {
  const parent = useContext(ThemeProviderContext);
  const isRoot = parent === null;

  const [internalMode, setInternalMode] = useState<ThemeMode>(controlledMode ?? defaultMode);

  const resolvedMode = controlledMode ?? internalMode;

  const setMode = useCallback(
    (next: ThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(next);
      }
      onModeChange?.(next);
    },
    [controlledMode, onModeChange],
  );

  // 只有最顶层 ThemeProvider 操作 body class
  useEffect(() => {
    if (!isRoot) return;
    document.body.classList.toggle('dark', resolvedMode === 'dark');
    document.body.classList.toggle('light', resolvedMode === 'light');
  }, [isRoot, resolvedMode]);

  const mergedTheme = useMemo(
    () => merge({}, builtinThemes[resolvedMode], theme ?? {}) as ThemeConfig,
    [resolvedMode, theme],
  );

  const modeContextValue = useMemo(
    () => ({ mode: resolvedMode, setMode }),
    [resolvedMode, setMode],
  );

  const providerNode = <ConfigProvider theme={mergedTheme}>{children}</ConfigProvider>;

  return (
    <ThemeProviderContext.Provider value={NESTED_MARKER}>
      <ThemeModeContext.Provider value={modeContextValue}>
        {isRoot ? <StyleProvider layer>{providerNode}</StyleProvider> : providerNode}
      </ThemeModeContext.Provider>
    </ThemeProviderContext.Provider>
  );
}
