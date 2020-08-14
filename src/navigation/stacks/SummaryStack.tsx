import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {FilterScreen, SummaryScreen} from '../../screens';
import {t} from '../../utils/locales';

const SummaryStackNavigator = createStackNavigator();

const SummaryStack = () =>
{
    return (
        <SummaryStackNavigator.Navigator>
            <SummaryStackNavigator.Screen options={{
                title: t('screens.summary'),
                headerShown: false
            }} name='summary' component={SummaryScreen} />

            <SummaryStackNavigator.Screen options={{
                title: t('screens.filter'),
                headerShown: false
            }} name='filter' component={FilterScreen} />
        </SummaryStackNavigator.Navigator>
    );
};

export {SummaryStack};
