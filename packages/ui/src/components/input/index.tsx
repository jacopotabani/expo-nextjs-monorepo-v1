import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ ...props }, ref) => {
    const inputStyle = {
      height: 40,
      width: '100%' as const,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#d1d5db',
      backgroundColor: '#ffffff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 14,
    };

    return (
      <TextInput
        style={inputStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
