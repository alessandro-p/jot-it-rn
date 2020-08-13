import React from 'react';
import styled from 'styled-components/native';

const StyledImage = styled.Image`
    width: 200px;
    height: 150px;
    resize-mode: contain;
`;

const Logo = () =>
{
    return (
        <StyledImage
            source={require('../../assets/logo/logo.png')}
        />
    );
};

export {Logo};
