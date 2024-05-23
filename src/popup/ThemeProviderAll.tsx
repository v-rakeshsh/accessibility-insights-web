import { ThemeProvider } from "@fluentui/react";
import { BodyClassModifier } from "common/components/body-class-modifier";
import { DefaultTheme } from "common/styles/default-theme";
import { HighContrastTheme } from "common/styles/high-contrast-theme";
import React, { useEffect, useState } from "react"

export const ThemeProviderAll = ({ children, deps }) => {
    const [initialStoreData, setStoreData] = useState(deps.storesHub.getAllStoreData()!)
    const [theme, setTheme] = useState(DefaultTheme);

    const themeValue = initialStoreData?.userConfigurationStoreData?.enableHighContrast ? HighContrastTheme : DefaultTheme
    const isEnableHighContrast = initialStoreData?.userConfigurationStoreData?.enableHighContrast === true;

    useEffect(() => {
        setTheme(themeValue);
    }, [themeValue]);

    const hasStores = () => {
        if (deps == null) {
            return false;
        }

        const { storesHub } = deps;
        return storesHub && storesHub.hasStores();
    };

    const onStoreChange = async () => {
        const storeData = deps.storesHub.getAllStoreData();
        setStoreData(storeData);
    };

    useEffect(() => {
        if (!hasStores()) {
            return;
        }

        const { storesHub } = deps;
        storesHub.addChangedListenerToAllStores(onStoreChange);
    }, []);

    return (
        <ThemeProvider applyTo="body" theme={theme}><BodyClassModifier deps={deps} classNames={isEnableHighContrast ? ['high-contrast-theme'] : ['theme-switcher']} />{children}</ThemeProvider>
    )
}
