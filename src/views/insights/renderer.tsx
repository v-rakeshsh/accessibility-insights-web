// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
//import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Theme, ThemeDeps } from 'common/components/theme';
import { config } from 'common/configuration';
import { DocumentManipulator } from 'common/document-manipulator';
//import { DefaultTheme } from 'common/styles/default-theme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InsightsRouter, ContentRouteDeps } from './insights-router';

export type RendererDeps = {
    dom: Document;
    render: ReactDOM.Renderer;
    initializeFabricIcons: () => void;
} & ContentRouteDeps &
    ThemeDeps;

export function renderer(deps: RendererDeps): void {
    console.log('deps---->', deps)
    const { dom, render, initializeFabricIcons } = deps;
    const iconPath = '../' + config.getOption('icon128');
    const documentElementSetter = new DocumentManipulator(dom);
    documentElementSetter.setShortcutIcon(iconPath);

    initializeFabricIcons();

    const insightsRoot = dom.querySelector('#insights-root');
    render(
        <>

            <Theme deps={deps} />

            <InsightsRouter deps={deps} />

        </>,
        insightsRoot,
    );
}
