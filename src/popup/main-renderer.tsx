// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { title } from 'content/strings/application';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Theme, ThemeDeps, ThemeInnerState } from '../common/components/theme';
import { WithStoreSubscriptionDeps } from '../common/components/with-store-subscription';
import { DropdownClickHandler } from '../common/dropdown-click-handler';
import { DiagnosticViewToggleFactory } from './components/diagnostic-view-toggle-factory';
import { PopupViewControllerDeps, PopupViewWithStoreSubscription } from './components/popup-view';
import { PopupHandlers } from './handlers/popup-handlers';
import { LaunchPadRowConfigurationFactory } from './launch-pad-row-configuration-factory';
import { Button, FluentProvider, teamsHighContrastTheme, webDarkTheme } from '@fluentui/react-components';
import { ThemeProviderAll } from 'popup/ThemeProviderAll';

export type MainRendererDeps = PopupViewControllerDeps &
    WithStoreSubscriptionDeps<ThemeInnerState> &
    ThemeDeps;

export class MainRenderer {
    constructor(
        private readonly deps: MainRendererDeps,
        private readonly popupHandlers: PopupHandlers,
        private readonly renderer: typeof createRoot,
        private readonly dom: Document,
        private readonly popupWindow: Window,
        private readonly targetTabUrl: string,
        private readonly hasAccess: boolean,
        private readonly launchPadRowConfigurationFactory: LaunchPadRowConfigurationFactory,
        private readonly diagnosticViewToggleFactory: DiagnosticViewToggleFactory,
        private readonly dropdownClickHandler: DropdownClickHandler,
    ) { }

    public render(): void {
        const container = this.dom.querySelector('#popup-container');
        const root = this.renderer(container);
        console.log('rendering main renderer on toggle---')
        root.render(
            <>
                {/* <Theme deps={this.deps} /> */}
                <ThemeProviderAll deps={this.deps}>
                    <PopupViewWithStoreSubscription
                        deps={this.deps}
                        title={title}
                        popupHandlers={this.popupHandlers}
                        popupWindow={this.popupWindow}
                        targetTabUrl={this.targetTabUrl}
                        hasAccess={this.hasAccess}
                        launchPadRowConfigurationFactory={this.launchPadRowConfigurationFactory}
                        diagnosticViewToggleFactory={this.diagnosticViewToggleFactory}
                        dropdownClickHandler={this.dropdownClickHandler}
                    />
                </ThemeProviderAll>
            </>,
        );
    }
}
