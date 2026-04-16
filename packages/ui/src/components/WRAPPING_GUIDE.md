# Ant Design 组件二次封装最佳实践

本文档针对「仅覆盖少量默认属性」的轻量封装场景，总结了关键原则和常见陷阱。

## 核心原则

**透明代理**：封装后的组件对外表现应与原组件完全一致，除了被覆盖的属性外，消费者不应感知到任何差异。

## 关键检查项

### 1. 类型完整性

antd 许多组件采用 `CompoundedComponent` 模式——在函数组件上挂载静态子组件（如 `Button.Group`、`Form.Item`）。封装时必须保留这些静态成员。

```tsx
// ❌ 错误：丢失 Button.Group 类型和运行时访问
const Button = (props: ButtonProps) => <AntdButton {...props} />;

// ✅ 正确：完整复制 CompoundedComponent 结构
type CompoundedButton = typeof InternalButton & {
  Group: typeof AntdButton.Group;
};
const Button = InternalButton as CompoundedButton;
Button.Group = AntdButton.Group;
```

### 2. Ref 转发

antd 组件通过 `React.forwardRef` 暴露 DOM ref。封装组件**必须**用 `forwardRef` 透传 ref，否则消费者无法获取底层 DOM 节点。

```tsx
// ❌ 错误：ref 被吞掉
const Button = (props: ButtonProps) => <AntdButton {...props} />;

// ✅ 正确：透传 ref
const InternalButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => <AntdButton ref={ref} {...props} />,
);
```

### 3. Props 合并顺序

被覆盖的属性放在展开运算符**之前**，确保：

- 用户可以覆盖（如果设计允许）
- 或放在展开运算符**之后**（如果要强制锁定）

```tsx
// 用户可覆盖的默认值：写在 ...props 之前
<AntdButton autoInsertSpace={false} {...props} />

// 强制锁定的值：写在 ...props 之后
<AntdButton {...props} autoInsertSpace={false} />
```

本项目选择「用户可覆盖」策略，即默认值放在前面。

### 4. 内部标记保留

antd 通过 `__ANT_BUTTON = true` 等标记在内部识别组件类型。封装时需要保留这些标记，否则可能影响 antd 内部逻辑（如 Space 组件对 Button 的特殊处理）。

### 5. displayName 设置

设置 `displayName` 便于 React DevTools 调试。

## 完整模板

```tsx
import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps } from 'antd';

// 1. forwardRef 透传 ref
const InternalButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    return <AntdButton autoInsertSpace={false} ref={ref} {...props} />;
  },
);

// 2. 构造 CompoundedComponent 类型
type CompoundedButton = typeof InternalButton & {
  Group: typeof AntdButton.Group;
  __ANT_BUTTON: boolean;
};

// 3. 类型断言 + 挂载静态成员
const Button = InternalButton as CompoundedButton;
Button.Group = AntdButton.Group;
Button.__ANT_BUTTON = true;
Button.displayName = 'Button';

export type { ButtonProps };
export default Button;
```

## 常见陷阱

| 陷阱                                      | 后果                              | 解决方案                          |
| ----------------------------------------- | --------------------------------- | --------------------------------- |
| 未用 `forwardRef`                         | `ref` 传入报错或为 `null`         | 使用 `React.forwardRef`           |
| 未挂载 `Group` 等静态成员                 | `Button.Group` 运行时 `undefined` | 手动赋值静态成员                  |
| 未保留 `__ANT_BUTTON`                     | antd 内部判断失效                 | 复制该标记                        |
| `typeof AntdButton` 直接当类型            | 类型断言失败（包含私有静态成员）  | 自行构造 CompoundedComponent 类型 |
| 导出了 named export `Button` 又 `default` | 消费者困惑                        | 选择一种主导出方式                |
