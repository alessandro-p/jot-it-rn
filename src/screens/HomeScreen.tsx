import 'react-native-get-random-values';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {v4 as uuid_v4} from 'uuid';

import * as theme from '../../src/theme';
import {CustomButton, CustomSafeAreaView, Logo} from '../components';
import * as categories_actions from '../flux/actions/categories';
import * as expenses_actions from '../flux/actions/expenses';
import * as income_actions from '../flux/actions/incomes';
import {ApplicationState} from '../flux/reducers';
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
    const {selected_category} = useSelector((store: ApplicationState) => store.categories);

    const navigation = useNavigation();
    const is_focussed = useIsFocused();
    const category_ref = useRef(null as any);

    const [value, set_value] = useState('');
    const [value_error, set_value_error] = useState('');
    const [success_message, set_success_message] = useState('');

    useEffect(() => clear_fields(), [is_focussed]);

    const dispatch = useDispatch();

    const add_expense = () =>
    {
        clear_fields();
        if(isNaN(parseFloat(value)) || parseFloat(value) === 0)
            return set_value_error(t('errors.invalid_value'));

        set_value_error('');

        dispatch(expenses_actions.add_expense({
            expense: {
                id: uuid_v4(),
                value: -parseFloat(value),
                category: selected_category,
                timestamp: Date.now()
            }
        }));

        clear_input_fields();
        set_success_message(t('home.add_expense_success'));
    };

    const add_income = () =>
    {
        clear_fields();
        if(isNaN(parseFloat(value)) || parseFloat(value) === 0)
            return set_value_error(t('errors.invalid_value'));

        set_value_error('');

        dispatch(income_actions.add_income({
            income: {
                id: uuid_v4(),
                value: parseFloat(value),
                category: selected_category,
                timestamp: Date.now()
            }
        }));
        clear_input_fields();
        set_success_message(t('home.add_income_success'));
    };

    const clear_input_fields = () =>
    {
        set_value('');
        dispatch(categories_actions.select_category(''));
    };

    const clear_fields = () =>
    {
        set_value_error('');
        set_success_message('');
    };

    return (
        <CustomSafeAreaView>
            <MainContainer>
                <Logo />
                <Input
                    keyboardType='numeric'
                    placeholder={t('home.value')}
                    returnKeyType='done'
                    onSubmitEditing={() => category_ref?.current && category_ref.current.focus()}
                    value={value}
                    onChangeText={(text: string) => set_value(text)}
                    errorMessage={value_error}
                />
                <Input
                    ref={category_ref}
                    placeholder={t('home.category')}
                    onTouchStart={() => navigation.navigate('categories')}
                    value={selected_category}
                    editable={false}
                />
                <ButtonContainer>
                    <CustomButton
                        text={t('home.add_expense_btn')}
                        onPress={() => add_expense()}
                        bg_color='primary'
                    />
                    <CustomButton
                        text={t('home.add_income_btn')}
                        onPress={() => add_income()}
                        bg_color='secondary'
                    />
                </ButtonContainer>

                <SuccessMessage>{success_message}</SuccessMessage>
            </MainContainer>
        </CustomSafeAreaView>
    );
};

export {HomeScreen};
