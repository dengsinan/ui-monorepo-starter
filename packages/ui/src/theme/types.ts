import type { ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark';

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** 受控模式：外部控制当前主题模式 */
  mode?: ThemeMode;
  /** 非受控模式下的初始值 */
  defaultMode?: ThemeMode;
  /** 模式变化回调 */
  onModeChange?: (mode: ThemeMode) => void;
  /** 用户自定义主题，会与内置主题深合并（用户值优先） */
  theme?: ThemeConfig;
}

export interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}
