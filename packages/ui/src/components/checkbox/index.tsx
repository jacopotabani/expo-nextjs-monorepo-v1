import React from 'react';
import { Pressable, View } from 'react-native';

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ checked = false, onPress, disabled = false, ...props }, ref) => {
    const checkboxStyle = {
      width: 16,
      height: 16,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#2563eb',
      backgroundColor: checked ? '#2563eb' : 'transparent',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      opacity: disabled ? 0.5 : 1,
    };

    return (
      <Pressable onPress={onPress} disabled={disabled}>
        <View
          ref={ref}
          style={checkboxStyle}
          {...props}
        >
          {checked && (
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#ffffff',
                borderRadius: 1,
              }}
            />
          )}
        </View>
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
