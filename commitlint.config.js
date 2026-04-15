/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建过程或辅助工具的变动
        'ci', // CI配置
        'build', // 构建
        'revert', // 回滚
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'repo',
        'core', // 核心组件
        'ui', // UI组件
        'hooks', // 自定义hooks
        'utils', // 工具函数
        'config', // 配置
        'docs',
        'storybook', // Storybook
        'deps', // 依赖
        'release', // 发布
      ],
    ],
    'scope-empty': [0, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
