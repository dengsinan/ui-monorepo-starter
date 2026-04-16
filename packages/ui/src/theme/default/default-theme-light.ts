import type { ThemeConfig } from 'antd';
import merge from 'lodash-es/merge';
import defaultThemeBase from './default-theme-base';

const defaultThemeLight: ThemeConfig = merge({}, defaultThemeBase, {
  token: {
    // 仅浅色需要覆盖的 token 写在这里
  },
});

export default defaultThemeLight;
