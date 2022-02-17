import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import arrowBackIcon from '../../../assets/arrow_back.png';
import arrowNextIcon from '../../../assets/arrow_next.png';
import webIcon from '../../../assets/web.png';
import refreshIcon from '../../../assets/ic_refresh_page.png';
import incognitoIcon from '../../../assets/incognito.png';

const HEIGHT_HEADER = 60;
const PADDING = 8;
const HEIGHT_INPUT_ADDRESS = HEIGHT_HEADER - 8 * 2;
const ICON_SIZE = 40;

const Header: React.FC<any> = (props) => {

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.inputAddress}
        placeholder="Search or type web address"
      />
    </View>
  );

}

const styles = StyleSheet.create({
  header: {
    height: HEIGHT_HEADER,
    flexDirection: 'row',
  },
  inputAddress: {
    flex: 1,
  },


});

export { Header };