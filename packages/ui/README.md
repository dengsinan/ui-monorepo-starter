# @dengsinan/ui

**该项目为测试项目 仅做学习**

基于 React 19 与 Ant Design 6 的 UI 组件库。

## 安装

```bash
pnpm add @dengsinan/ui antd
```

`react`、`react-dom` 与 `antd` 为 peer dependencies，请在业务项目中自行安装。

## 使用

```tsx
import { Button, Table, ThemeProvider } from '@dengsinan/ui';
import '@dengsinan/ui/style.css';

export function App() {
  return (
    <ThemeProvider>
      <Button type="primary">Hello</Button>
      <Table dataSource={[]} columns={[]} rowKey="id" />
    </ThemeProvider>
  );
}
```

## 导出内容

- `Button`
- `Table`
- `ThemeProvider`
- `useTheme`
- `antd` 的公开导出

## 开发

```bash
pnpm --filter @dengsinan/ui build
pnpm --filter @dengsinan/ui typecheck
```
