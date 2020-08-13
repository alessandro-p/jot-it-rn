import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {Icon} from 'react-native-elements';
import styled from 'styled-components/native';

import * as theme from '../theme';

interface CustomButtonProps extends TouchableOpacityProps
{
    text: string;
    bg_color?: keyof theme.colors;
    icon?: Partial<Icon>;
    width?: number | string;
}

const ButtonContainer = styled.TouchableOpacity<{bg_color: string, width?: number | string}>`
	display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: ${props => props.width ? (props.width === 'stretch' ? '100%' : `${props.width}px`) : '120px'};
	height: 40px;
	padding: 8px;
	border-radius: 8px;
    margin: 8px;

	background-color: ${props => props.bg_color};
`;

const ButtonText = styled.Text`
	font-size: 16px;
    font-weight: 500;
    color: #FFF;
`;

const TextContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CustomButton = (props: CustomButtonProps) => (
    <ButtonContainer
        {...props}
        bg_color={theme.default.colors[props.bg_color || 'primary']}
    >
        <TextContainer>
            {props.icon ? props.icon : <></>}
            <ButtonText>{props.text}</ButtonText>
        </TextContainer>

    </ButtonContainer>
);

export {CustomButton};
