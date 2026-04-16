import React from 'react';
import { Table as AntdTable } from 'antd';
import type { TableProps } from 'antd';
import clsx from 'clsx';
import styles from './style.module.less';

type TableRef = React.ComponentRef<typeof AntdTable>;

type InternalTableType = <RecordType = Record<string, unknown>>(
  props: React.PropsWithChildren<TableProps<RecordType>> & React.RefAttributes<TableRef>,
) => React.ReactElement;

const InternalTable = React.forwardRef<TableRef, TableProps<Record<string, unknown>>>(
  ({ className, ...props }, ref) => {
    const mergedClassName = clsx(styles.root, className);

    return <AntdTable ref={ref} {...props} className={mergedClassName} />;
  },
);
InternalTable.displayName = 'InternalTable';

type CompoundedTable = InternalTableType & {
  SELECTION_COLUMN: typeof AntdTable.SELECTION_COLUMN;
  EXPAND_COLUMN: typeof AntdTable.EXPAND_COLUMN;
  SELECTION_ALL: typeof AntdTable.SELECTION_ALL;
  SELECTION_INVERT: typeof AntdTable.SELECTION_INVERT;
  SELECTION_NONE: typeof AntdTable.SELECTION_NONE;
  Column: typeof AntdTable.Column;
  ColumnGroup: typeof AntdTable.ColumnGroup;
  Summary: typeof AntdTable.Summary;
  displayName?: string;
};

const Table = InternalTable as unknown as CompoundedTable;
Table.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;
Table.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;
Table.SELECTION_ALL = AntdTable.SELECTION_ALL;
Table.SELECTION_INVERT = AntdTable.SELECTION_INVERT;
Table.SELECTION_NONE = AntdTable.SELECTION_NONE;
Table.Column = AntdTable.Column;
Table.ColumnGroup = AntdTable.ColumnGroup;
Table.Summary = AntdTable.Summary;
Table.displayName = 'Table';

export type { TableProps, TableRef };
export default Table;
