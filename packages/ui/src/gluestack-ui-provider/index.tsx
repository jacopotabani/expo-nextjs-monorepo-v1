import React from 'react';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  // For React Native, we'll use a simpler approach without nativewind for now
  const getContainerStyle = () => {
    const baseStyle = {
      flex: 1,
      height: '100%' as const,
      width: '100%' as const,
      backgroundColor: mode === 'dark' ? '#18181b' : '#ffffff',
    };
    
    return [baseStyle, props.style];
  };

  return (
    <View style={getContainerStyle()}>
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
