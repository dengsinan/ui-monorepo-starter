import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps } from 'antd';

const InternalButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    return <AntdButton autoInsertSpace={false} ref={ref} {...props} />;
  },
);
InternalButton.displayName = 'InternalButton';

type CompoundedButton = typeof InternalButton & {
  Group: typeof AntdButton.Group;
  __ANT_BUTTON: boolean;
};

const Button = InternalButton as CompoundedButton;
Button.Group = AntdButton.Group;
Button.__ANT_BUTTON = true;
Button.displayName = 'Button';

export type { ButtonProps };
export default Button;
