import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import { Browser } from '@components';

export const HomeScreen: React.FC<any> = (props) => {

  return (
    <View style={ styles.container }>
      <Browser />
    </View>
  );

};