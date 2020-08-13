import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {CategoryScreen, HomeScreen} from '../../screens';
import {t} from '../../utils/locales';

const HomeStackNavigator = createStackNavigator();

const HomeStack = () =>
{
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen options={{
                title: t('screens.home'),
                headerShown: false
            }} name='home' component={HomeScreen} />
            <HomeStackNavigator.Screen options={{
                title: t('screens.categories'),
                headerShown: false
            }} name='categories' component={CategoryScreen} />
        </HomeStackNavigator.Navigator>
    );
};

export {HomeStack};
