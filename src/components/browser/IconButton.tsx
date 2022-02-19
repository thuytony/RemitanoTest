import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType, ViewStyle } from 'react-native';

interface IconButtonProps {
  onPress(): void
  icon: ImageSourcePropType
  style?: ViewStyle
  isDisable?: boolean
}

const IconButton: React.FC<IconButtonProps> = (props) => {

  const { onPress, icon, style, isDisable } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style ? style : {}} disabled={isDisable}>
      <Image source={icon} style={[styles.icon, isDisable ? styles.iconDisable : {}]} />
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
  iconDisable: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
    tintColor: 'grey',
    opacity: 0.3,
  },

});

export { IconButton };