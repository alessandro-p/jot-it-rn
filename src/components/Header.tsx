import React from 'react';
import {Icon} from 'react-native-elements';
import styled from 'styled-components/native';

import theme from '../../src/theme';

const StyledText = styled.Text`
    padding: 6px;
    color: ${theme.colors.dark};
    font-weight: 500;
    font-size: ${theme.fonts.xl}px;
`;

const HeaderContainer = styled.View<{left: boolean}>`
    display: flex;
    padding-right: ${theme.padding.xs}px;
    flex-direction: row;
    justify-content: ${props => props.left ? 'flex-start' : 'space-between'} ;
    align-items: center;
`;

interface HeaderProps
{
    icon?: Partial<Icon>;
    left?: boolean;
}

const Header = (props: any & HeaderProps) =>
{
    const render_icon = () =>
    {
        return props.icon ? props.icon : <></>;
    };

    return (
        <HeaderContainer left={props.left}>
            {props.left ? render_icon() : <></>}
            <StyledText>{props.children}</StyledText>
            {!props.left ? render_icon() : <></>}
        </HeaderContainer>
    );
};

export {Header};
