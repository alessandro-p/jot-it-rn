import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {t} from '../utils/locales';

const HomeScreen = () =>
{
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={style.main}>
                <Text style={style.text}>{t('home.title')}</Text>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 32
    }
});

export {HomeScreen};
