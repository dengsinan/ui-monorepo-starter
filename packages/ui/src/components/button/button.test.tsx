import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('autoInsertSpace={false}', () => {
    render(<Button>确认</Button>);

    const button = screen.getByRole('button', { name: '确认' });

    // 验证按钮文本不包含自动插入的空格
    // antd 的 autoInsertSpace 会在两个汉字之间插入空格（如 "确 认"）
    // 当 autoInsertSpace={false} 时，应该直接显示 "确认"
    expect(button.textContent).toBe('确认');
    expect(button.textContent).not.toContain('确 认');
    expect(button).toBeInTheDocument();
  });

  it('应正确渲染中文字符内容', () => {
    const { container } = render(<Button>提交</Button>);
    const button = container.querySelector('button');

    expect(button?.textContent).toBe('提交');
  });
});
