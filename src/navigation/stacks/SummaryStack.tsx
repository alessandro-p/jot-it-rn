import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {SummaryScreen} from '../../screens';
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
        </SummaryStackNavigator.Navigator>
    );
};

export {SummaryStack};
