import React from 'react';
import { StatusBar } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, Image } from './styles';

export default function Header() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#191620" />
      <Container>
        <Image source={logo} />
      </Container>
    </>
  );
}
