import React from 'react';
import styled from 'styled-components/native';

import theme from '../theme';

interface CustomTextProps
{
    color?: string;
    font_weight?: string;
    children: string;
}

const StyledText = styled.Text<{font_weight?: string, color?: string}>`
    color: ${props => props.color ? props.color : theme.colors.black};
    font-weight: ${props => props.font_weight || '400'};
`;

const CustomText = (props: CustomTextProps) =>
{
    return (
        <StyledText {...props}>
            {props.children}
        </StyledText>
    );
};

export {CustomText};
