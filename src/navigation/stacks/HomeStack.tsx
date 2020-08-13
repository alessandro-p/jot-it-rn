import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {HomeScreen} from '../../screens/HomeScreen';

const HomeStackNavigator = createStackNavigator();

const HomeStack = () =>
{
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen options={{
                title: 'Home',
                headerShown: false
            }} name='home' component={HomeScreen} />
        </HomeStackNavigator.Navigator>
    );
};

export {HomeStack};
