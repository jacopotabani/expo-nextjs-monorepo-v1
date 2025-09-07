import React from 'react';
import { Text, TextProps } from 'react-native';

interface LabelProps extends TextProps {
  className?: string;
}

export const Label = React.forwardRef<Text, LabelProps>(
  ({ ...props }, ref) => {
    const labelStyle = {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1,
      color: '#000000',
    };

    return (
      <Text
        ref={ref}
        style={labelStyle}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
