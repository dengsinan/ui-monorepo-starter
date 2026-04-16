import { Table } from '@dengsinan/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32 },
  { key: '2', name: '李四', age: 28 },
  { key: '3', name: '王五', age: 24 },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    dataSource,
  },
};
