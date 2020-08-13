import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Icon, Input, ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {BackNavigationButton, CustomButton, CustomSafeAreaView} from '../components';
import * as categories_actions from '../flux/actions/categories';
import {ApplicationState} from '../flux/reducers';
import theme from '../theme';
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

const CategoryItem = (props: CategoryItemProps) =>
{
    return (
        <CategoryContainer>
            <ListItem
                title={props.name}
                containerStyle={{padding: 8}}
                bottomDivider
                rightElement={
                    <CustomButton
                        key={props.name}
                        text={t('categories.pick')}
                        bg_color='primary'
                        onPress={() => props.on_press(props.name)}
                        icon={<Icon
                            name='check'
                            color={theme.colors.white}
                        />}
                        width={80}
                    />
                }
            />
        </CategoryContainer>
    );
};

export {CategoryItem};

const CategoryScreen = () =>
{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [category_error, set_category_error] = useState('');

    const {selected_category} = useSelector((store: ApplicationState) => store.categories);
    const {expenses} = useSelector((store: ApplicationState) => store.expenses);
    const {incomes} = useSelector((store: ApplicationState) => store.incomes);

    const unique_categories = [...new Set([...expenses, ...incomes].map((element) => element.category))];

    const on_item_selected = (selected: string) =>
    {
        dispatch(categories_actions.select_category(selected));
        navigation.goBack();
    };

    const render_item = (item: string) =>
    {
        if(item === '' || item === selected_category)
            return <></>;

        return (
            <CategoryItem
                name={item}
                on_press={on_item_selected}
            />
        );
    };

    return (
        <CustomSafeAreaView>
            <SearchContainer>
                <BackNavigationButton />
                <Input
                    placeholder={t('categories.search_placeholder')}
                    value={selected_category}
                    onChangeText={(text) => dispatch(categories_actions.select_category(text))}
                    errorMessage={category_error}
                />
            </SearchContainer>

            <FlatList
                ListHeaderComponent={!!selected_category ? <CategoryItem on_press={on_item_selected} name={selected_category} /> : <></>}
                data={unique_categories}
                renderItem={({item}) => render_item(item)}
                keyExtractor={(item) => item}
            />
        </CustomSafeAreaView>
    );
};

export {CategoryScreen};
