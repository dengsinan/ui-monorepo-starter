import type { ThemeConfig } from 'antd';

/**
 * 与明暗无关的 Design Token：品牌色、圆角、尺寸、间距等。
 * 若某 token 在暗色下需要不同值，在 default-theme-dark.ts 的 token 里覆盖即可。
 */
const defaultThemeBase: ThemeConfig = {
  cssVar: {
    prefix: '',
  },
  token: {
    colorPrimary: '#16FF92',
  },
};

export default defaultThemeBase;
