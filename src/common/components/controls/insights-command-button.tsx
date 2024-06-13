// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { css } from '@fluentui/react';
import {
    Button,
    ButtonProps,
} from '@fluentui/react-components';
import {
    ArrowExportRegular,
    FolderArrowRightRegular,
    FolderOpenRegular,
    SaveRegular,
    ArrowClockwiseRegular,
    Checkmark16Filled,
    ChevronDownRegular,
    ChevronRightRegular,
} from '@fluentui/react-icons';
import { NamedFC } from 'common/react/named-fc';
import * as React from 'react';
import styles from './insights-command-button.scss';

React.useEffect;
export type InsightsCommandButtonProps = ButtonProps & {
    iconName?: any;
    componentRef?: any;
    text?: any;
    menuIconProps?: any;
};

// See https://www.figma.com/file/Wj4Ggf6GGQBQkiDIaHfXRX2B/Accessibility-Insights%3A-Styles?node-id=1%3A27

const Icons = {
    ArrowExportRegular: <ArrowExportRegular />,
    FolderArrowRightRegular: <FolderArrowRightRegular />,
    FolderOpenRegular: <FolderOpenRegular />,
    SaveRegular: <SaveRegular />,
    ArrowClockwiseRegular: <ArrowClockwiseRegular />,
    Checkmark16Filled: <Checkmark16Filled />,
    ChevronDownRegular: <ChevronDownRegular />,
    ChevronRightRegular: <ChevronRightRegular />,
};

export const InsightsCommandButton = NamedFC<InsightsCommandButtonProps>(
    'InsightsCommandButton',
    props => {
        const iconComponent = props.iconName;
        const menuIconComponent = props.menuIconProps ? props.menuIconProps.iconName : null;

        return (
            <Button
                appearance="transparent"
                {...props}
                icon={Icons[iconComponent]}
                className={css(styles.insightsCommandButton, props.className)}
                ref={props.componentRef}
            >
                <span className={css(styles.text)}>{props.text}</span>
                <span className={css(styles.menuIcon)}>
                    {menuIconComponent !== null && Icons[menuIconComponent]}
                </span>
            </Button>
        );
    },
);
