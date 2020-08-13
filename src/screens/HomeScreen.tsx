import React from 'react';
import {Input} from 'react-native-elements';
import styled from 'styled-components/native';

import * as theme from '../../src/theme';
import {CustomButton, CustomSafeAreaView, Logo} from '../components';
import {t} from '../utils/locales';

const MainContainer = styled.View`
    display: flex;
    flex: 1;
    padding: ${theme.default.padding.xs}px;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

const SuccessMessage = styled.Text`
    color: ${theme.default.colors.success};
`;

const HomeScreen = () =>
{
    return (
        <CustomSafeAreaView>
            <MainContainer>
                <Logo />
                <Input
                    keyboardType='numeric'
                    placeholder={t('home.value')}
                    returnKeyType='default'
                    onChangeText={(text: string) => console.log('Value changed', text)}
                />
                <Input
                    placeholder={t('home.category')}
                    onTouchStart={() => console.log('Touch started')}
                    editable={false}
                />
                <ButtonContainer>
                    <CustomButton
                        text={t('home.add_expense_btn')}
                        onPress={() => console.log('Add expense pressed')}
                        bg_color='primary'
                    />
                    <CustomButton
                        text={t('home.add_income_btn')}
                        onPress={() => console.log('Add income pressed')}
                        bg_color='secondary'
                    />
                </ButtonContainer>
            </MainContainer>
        </CustomSafeAreaView>
    );
};

export {HomeScreen};
