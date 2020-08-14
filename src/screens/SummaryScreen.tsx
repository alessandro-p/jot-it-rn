import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

import * as theme from '../../src/theme';
import {CustomSafeAreaView, CustomText, Header} from '../components';
import {ApplicationState} from '../flux/reducers';
import {Expense} from '../flux/reducers/expenses';
import {Income} from '../flux/reducers/incomes';
import {months} from '../utils/calendar';
import {t} from '../utils/locales';

const MainContainer = styled.View`
    display: flex;
    flex: 1;
`;

const ListViewSection = styled.View`
    display: flex;
    flex: 2;
`;

const FooterSection = styled.View`
    display: flex;
    flex: 1;
    padding-left: 16px;
    padding-right: 16px;
`;

const ExpenseText = styled.Text`
    color: ${theme.default.colors.error};
`;

const IncomeText = styled.Text`
    color: ${theme.default.colors.success};
`;

const FilterViewContainer = styled.View`
    margin-bottom: ${theme.default.margin.md}px;
`;

const SummaryScreen = () =>
{
    const navigation = useNavigation();
    const {from_date: from_date_filter, to_date: to_date_filter} = useSelector((store: ApplicationState) => store.filter);
    const {expenses} = useSelector((store: ApplicationState) => store.expenses);
    const {incomes} = useSelector((store: ApplicationState) => store.incomes);

    const render_date = (timestamp: number): string =>
    {
        if(!timestamp)
            return '';

        const date = new Date(timestamp);

        return `${date.toLocaleDateString()}`;
    };

    const render_filter = () =>
    {
        if(!from_date_filter || !to_date_filter)
            return <></>;

        return (
            <FilterViewContainer>
                <CustomText font_weight='600'>{t('filter.applied_filter')}</CustomText>
                <CustomText>{`${t('filter.from_date')}: ${from_date_filter.toLocaleDateString()}`}</CustomText>
                <CustomText>{`${t('filter.to_date')}: ${to_date_filter.toLocaleDateString()}`}</CustomText>
            </FilterViewContainer>
        );
    };

    const render_footer = () =>
    {
        const total_expenses = Math.abs(filtered_data(expenses).reduce((accumulator, expense) => accumulator + expense.value, 0));
        const total_incomes = filtered_data(incomes).reduce((accumulator, expense) => accumulator + expense.value, 0);

        return (
            <View>
                {render_filter()}
                <ExpenseText>{t('summary.total', {node: 'expenses'})} {total_expenses} €</ExpenseText>
                <IncomeText>{t('summary.total', {node: 'incomes'})} {total_incomes} €</IncomeText>
            </View>
        );
    };

    const get_header = (key: string) =>
    {
        const [year, month_number] = key.split('|');
        const month = months[parseInt(month_number, 10)];

        return `${t(`months.${month}`)} ${year}`;
    };

    const render_item = (items: (Expense & {key: string} | Income & {key: string})[]) =>
    {
        return <>
            {items.map((element, index) =>
            {
                return <>
                    {element.key ? <Header>{get_header(element.key)}</Header> : <></>}
                    <ListItem
                        key={index}
                        title={element.value > 0 ?
                            <IncomeText>{`${element.category}`}</IncomeText>
                            : <ExpenseText>{`${element.category}`}</ExpenseText>}
                        subtitle={render_date(element.timestamp)}
                        rightElement={element.value > 0 ? <IncomeText>{element.value} €</IncomeText>
                            : <ExpenseText>{element.value} €</ExpenseText>}
                        bottomDivider
                    />
                </>;
            })}
        </>;
    };

    const filtered_data = (values: (Expense | Income)[]) =>
    {
        if(!from_date_filter || !to_date_filter)
            return [...values];

        return values.filter((element) =>
        {
            const element_date = new Date(element.timestamp);
            element_date.setHours(0, 0, 0, 0);
            return element_date >= from_date_filter && element_date <= to_date_filter;
        });
    };

    const group_by_date = (values: (Expense | Income)[]) =>
    {
        const grouped_by_date = values.reduce((accumulator, element) =>
        {
            const element_date = new Date(element.timestamp);
            const key = `${element_date.getFullYear()}|${element_date.getMonth()}`;

            if(!accumulator[key])
                accumulator[key] = [{key, ...element}];
            else
                accumulator[key].push({...element});

            return accumulator;
        }, {} as {[key: string]: (Expense | Income & {key: string})[]});

        return Object.values(grouped_by_date);
    };

    return (
        <CustomSafeAreaView>
            <MainContainer>
                <Header
                    icon={<Icon
                        name='filter-list'
                        color={theme.default.colors.secondary}
                        raised
                        reverse
                        size={theme.default.icon_size.xs}
                        onPress={() => navigation.navigate('filter')}
                    />}
                >{t('screens.summary')}</Header>
                <ListViewSection>
                    <SwipeListView
                        data={group_by_date(filtered_data([...expenses, ...incomes]))}
                        renderItem={({item}) => render_item(item)}
                        keyExtractor={(item: (Expense & {key: string} | Income & {key: string})[]) => item[0].key}
                        disableRightSwipe
                        rightOpenValue={-100}
                    />
                </ListViewSection>
                <FooterSection>
                    {render_footer()}
                </FooterSection>
            </MainContainer>
        </CustomSafeAreaView>
    );
};

export {SummaryScreen};
