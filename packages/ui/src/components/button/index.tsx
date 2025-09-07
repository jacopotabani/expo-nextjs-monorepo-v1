import React from 'react';
import { Pressable, Text } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  disabled,
  onPress,
  ...props 
}: ButtonProps) {
  // For React Native, we'll use style objects instead of className
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 8,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      opacity: disabled ? 0.5 : 1,
    };
    
    const variantStyle = {
      default: { backgroundColor: '#2563eb' },
      outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#d1d5db' },
      ghost: { backgroundColor: 'transparent' }
    };
    
    const sizeStyle = {
      sm: { paddingHorizontal: 12, paddingVertical: 8 },
      md: { paddingHorizontal: 16, paddingVertical: 8 },
      lg: { paddingHorizontal: 24, paddingVertical: 12 }
    };
    
    return { ...baseStyle, ...variantStyle[variant], ...sizeStyle[size] };
  };

  const getTextStyle = () => {
    return {
      fontWeight: '500' as const,
      color: variant === 'default' ? '#ffffff' : '#111827'
    };
  };
  
  return (
    <Pressable 
      style={getButtonStyle()}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={getTextStyle()}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
