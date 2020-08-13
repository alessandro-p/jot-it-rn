import React from 'react';
import {Text} from 'react-native';
import {Input} from 'react-native-elements';
import styled from 'styled-components/native';

import {BackNavigationButton, CustomSafeAreaView} from '../components';
import {t} from '../utils/locales';

const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

interface CategoryItemProps
{
    name: string;
    on_press: (selected_category: string) => void;
}

const CategoryContainer = styled.View`
    padding-left: 6px;
`;

const CategoryScreen = () =>
{
    return (
        <CustomSafeAreaView>
            <SearchContainer>
                <BackNavigationButton />
                <Input
                    placeholder={t('categories.search_placeholder')}
                    value={''}
                    onChangeText={(text) => console.log('Changed')}
                />
            </SearchContainer>

            <Text>Select a category here</Text>
        </CustomSafeAreaView>
    );
};

export {CategoryScreen};
