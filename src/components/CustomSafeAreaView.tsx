import React from 'react';
import styled from 'styled-components/native';

import * as theme from '../theme';

const StyledSafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.default.colors.white};
`;

const MainView = styled.View`
    flex:1;
    padding: 0 10px 0 10px;
`;

const CustomSafeAreaView = (props: any) =>
{
    return (
        <StyledSafeAreaView>
            <MainView>
                {props.children}
            </MainView>
        </StyledSafeAreaView>

    );
};

export {CustomSafeAreaView};
