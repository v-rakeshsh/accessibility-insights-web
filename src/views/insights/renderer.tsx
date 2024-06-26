// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Theme, ThemeDeps } from 'common/components/theme';
import { config } from 'common/configuration';
import { DocumentManipulator } from 'common/document-manipulator';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { InsightsRouter, ContentRouteDeps } from './insights-router';
import { FluentProvider } from '@fluentui/react-components';

export type RendererDeps = {
    dom: Document;
    render: typeof createRoot;
    initializeFabricIcons: () => void;
} & ContentRouteDeps &
    ThemeDeps;

export function renderer(deps: RendererDeps): void {
    const { dom, render, initializeFabricIcons } = deps;
    const iconPath = '../' + config.getOption('icon128');
    const documentElementSetter = new DocumentManipulator(dom);
    documentElementSetter.setShortcutIcon(iconPath);

    initializeFabricIcons();

    const insightsRoot = dom.querySelector('#insights-root');
    const root = render(insightsRoot);
    root.render(
        <>
            <HelmetProvider>
                {/* <InsightsRouter deps={deps} /> */}
                {/* <Theme deps={deps} /> */}
                <Theme deps={deps} children={<InsightsRouter deps={deps} />} />
            </HelmetProvider>
        </>,
    );
}
