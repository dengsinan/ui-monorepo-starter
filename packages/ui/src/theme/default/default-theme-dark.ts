import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import merge from 'lodash-es/merge';
import defaultThemeBase from './default-theme-base';

const defaultThemeDark: ThemeConfig = merge({}, defaultThemeBase, {
  algorithm: theme.darkAlgorithm,
  token: {
    // 暗色下需要与 base 不同的 token 写在这里，例如：
    // colorBgElevated: '...',
  },
});

export default defaultThemeDark;
