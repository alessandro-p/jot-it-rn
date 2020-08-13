import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Icon} from 'react-native-elements';

import theme from '../theme';

const BackNavigationButton = () =>
{
    const navigation = useNavigation();

    return (
        <Icon
            name={'arrow-back'}
            type={'material-icons'}
            size={theme.icon_size.lg}
            iconStyle={{padding: 5}}
            onPress={() => navigation.goBack()}
        />
    );
};

export {BackNavigationButton};
