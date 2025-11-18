import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { PropsWithChildren, createContext } from 'react';
import { MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';

import { globalColors } from '@/constants';

const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
});

export const ThemeContext = createContext({
    theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const theme = LightTheme;

    const CombinedTheme = {
        ...MD3LightTheme,
        dark: false,
        colors: {
            ...MD3LightTheme.colors,
            primary: globalColors.primary,
            secondary: globalColors.secondary,
            tertiary: globalColors.tertiary,
            error: globalColors.danger,
            warning: globalColors.warning,
            success: globalColors.success,
            info: globalColors.info,
            surface: globalColors.surface,
            surfaceVariant: globalColors.card,
            background: globalColors.background,
            onPrimary: globalColors.background,
            onSecondary: globalColors.background,
            onSurface: globalColors.text,
            onBackground: globalColors.text,
            outline: globalColors.border,
            outlineVariant: globalColors.border,
            elevation: globalColors.elevation,
        },
    };

    return (
        <PaperProvider theme={CombinedTheme}>
            <ThemeContext.Provider
                value={{
                    theme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        </PaperProvider>
    );
};
