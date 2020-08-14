import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {BackNavigationButton, CustomButton, CustomSafeAreaView, Header} from '../components';
import * as filter_actions from '../flux/actions/filter';
import {t} from '../utils/locales';

const StyledDatePicker = styled(DateTimePicker) <{show: boolean}>`
    display: ${props => props.show ? 'flex' : 'none'};
`;

enum AvailableDateValues
{
    FROM = 'from',
    TO = 'to'
}

const FilterScreen = () =>
{
    const today = new Date();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [show_from_date, set_show_from_date] = useState(false);
    const [show_to_date, set_show_to_date] = useState(false);

    const [from_date, set_from_date] = useState(today);
    const [to_date, set_to_date] = useState(today);

    const [initialized_from, set_initialized_from] = useState(false);
    const [initialized_to, set_initialized_to] = useState(false);

    const toggle = (value: AvailableDateValues) =>
    {
        switch(value)
        {
            case AvailableDateValues.FROM:
                set_initialized_from(true);
                set_show_to_date(false);
                set_show_from_date(true);
                break;
            case AvailableDateValues.TO:
                set_initialized_to(true);
                set_show_from_date(false);
                set_show_to_date(true);
                break;
            default:
                return;
        }
    };

    const on_filter_confirm = () =>
    {
        from_date.setHours(0, 0, 0, 0);
        to_date.setHours(0, 0, 0, 0);

        dispatch(filter_actions.set_filter({filter: {from_date, to_date}}));
        if(navigation.canGoBack())
            navigation.goBack();
    };

    return (
        <CustomSafeAreaView>
            <Header left icon={<BackNavigationButton />}>{t('filter.select_filter')}</Header>
            <Input
                placeholder={t('filter.from_date')}
                disabledInputStyle={{opacity: 1}}
                onTouchStart={() => toggle(AvailableDateValues.FROM)}
                value={initialized_from ? from_date.toLocaleDateString() : ''}
                disabled
            />
            <Input
                placeholder={t('filter.to_date')}
                disabledInputStyle={{opacity: 1}}
                onTouchStart={() => toggle(AvailableDateValues.TO)}
                value={initialized_to ? to_date.toLocaleDateString() : ''}
                disabled
            />
            <StyledDatePicker
                show={show_from_date}
                value={from_date}
                mode='date'
                onChange={(_event, selected_date) => set_from_date(selected_date || today)}
                maximumDate={today}
            />
            <StyledDatePicker
                show={show_to_date}
                value={to_date}
                mode='date'
                onChange={(_event, selected_date) => set_to_date(selected_date || today)}
                maximumDate={today}
                minimumDate={from_date}
            />

            <CustomButton
                text={t('filter.confirm')}
                width='stretch'
                onPress={on_filter_confirm}
            />

        </CustomSafeAreaView>
    );
};

export {FilterScreen};
