import React from 'react';
import {ListItem} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

import * as theme from '../../src/theme';
import {CustomSafeAreaView, Header} from '../components';
import {ApplicationState} from '../flux/reducers';
import {Expense} from '../flux/reducers/expenses';
import {Income} from '../flux/reducers/incomes';
import {t} from '../utils/locales';

const MainContainer = styled.View`
    display: flex;
    flex: 1;
`;

const ListViewSection = styled.View`
    display: flex;
    flex: 2;
`;

const ExpenseText = styled.Text`
    color: ${theme.default.colors.error};
`;

const IncomeText = styled.Text`
    color: ${theme.default.colors.success};
`;

const SummaryScreen = () =>
{
    const {expenses} = useSelector((store: ApplicationState) => store.expenses);
    const {incomes} = useSelector((store: ApplicationState) => store.incomes);

    const render_date = (timestamp: number): string =>
    {
        if(!timestamp)
            return '';

        const date = new Date(timestamp);

        return `${date.toLocaleDateString()}`;
    };

    const render_item = (element: Expense | Income) =>
    {
        return <>
            <ListItem
                title={element.value > 0 ?
                    <IncomeText>{`${element.category}`}</IncomeText>
                    : <ExpenseText>{`${element.category}`}</ExpenseText>}
                subtitle={render_date(element.timestamp)}
                rightElement={element.value > 0 ?
                    <IncomeText>{element.value} €</IncomeText>
                    : <ExpenseText>{element.value} €</ExpenseText>}
                bottomDivider
            />
        </>;
    };

    return (
        <CustomSafeAreaView>
            <MainContainer>
                <Header>{t('screens.summary')}</Header>
                <ListViewSection>
                    <SwipeListView
                        data={[...expenses, ...incomes]}
                        renderItem={({item}) => render_item(item)}
                        keyExtractor={(item: Expense | Income) => item.id}
                        disableRightSwipe
                        rightOpenValue={-100}
                    />
                </ListViewSection>
            </MainContainer>
        </CustomSafeAreaView>
    );
};

export {SummaryScreen};
