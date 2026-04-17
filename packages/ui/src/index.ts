// 全局样式入口：layer 顺序声明 + 公共样式
// Vite lib 模式会将其抽取到 dist/style.css，JS 产物不包含 CSS 引用
import './styles/index.less';

export * from 'antd';

export { default as Button, type ButtonProps } from './components/button';
export { default as Table, type TableProps, type TableRef } from './components/table';

export { ThemeProvider } from './theme/theme-provider';
export { useTheme } from './theme/use-theme';
export type { ThemeMode, ThemeProviderProps } from './theme/types';
