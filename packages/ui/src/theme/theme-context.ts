import { createContext } from 'react';
import type { ThemeModeContextValue } from './types';

/**
 * 用于检测 ThemeProvider 嵌套层级。
 * 值为 null 表示当前没有祖先 ThemeProvider（即自己是 root）。
 */
export const ThemeProviderContext = createContext<{ nested: true } | null>(null);

/**
 * 暴露当前主题模式与切换方法给子组件。
 */
export const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  setMode: () => {},
});
