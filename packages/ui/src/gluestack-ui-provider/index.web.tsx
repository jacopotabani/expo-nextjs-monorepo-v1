'use client';
import React, { useEffect } from 'react';

export type ModeType = 'light' | 'dark' | 'system';

// CSS variables for light and dark themes
const cssVariables = {
  light: {
    '--color-primary-0': '179 179 179',
    '--color-primary-50': '153 153 153',
    '--color-primary-100': '128 128 128',
    '--color-primary-200': '115 115 115',
    '--color-primary-300': '102 102 102',
    '--color-primary-400': '82 82 82',
    '--color-primary-500': '51 51 51',
    '--color-primary-600': '41 41 41',
    '--color-primary-700': '31 31 31',
    '--color-primary-800': '13 13 13',
    '--color-primary-900': '10 10 10',
    '--color-primary-950': '8 8 8',
    '--color-background-0': '255 255 255',
    '--color-background-50': '246 246 246',
  },
  dark: {
    '--color-primary-0': '166 166 166',
    '--color-primary-50': '175 175 175',
    '--color-primary-100': '186 186 186',
    '--color-primary-200': '197 197 197',
    '--color-primary-300': '212 212 212',
    '--color-primary-400': '221 221 221',
    '--color-primary-500': '230 230 230',
    '--color-primary-600': '240 240 240',
    '--color-primary-700': '250 250 250',
    '--color-primary-800': '253 253 253',
    '--color-primary-900': '254 249 249',
    '--color-primary-950': '253 252 252',
    '--color-background-0': '18 18 18',
    '--color-background-50': '39 38 37',
  }
};

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    // For web, we apply the theme variables to the document
    const colorScheme = mode === 'system' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      mode;

    const root = document.documentElement;
    const themeVars = cssVariables[colorScheme];
    
    // Apply CSS variables to root element
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [mode]);

  return (
    <div 
      style={{ 
        flex: 1, 
        height: '100%', 
        width: '100%',
        ...props.style 
      }}
    >
      {props.children}
    </div>
  );
}
