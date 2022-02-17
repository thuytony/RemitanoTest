import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from './Header';

const Browser: React.FC<any> = (props) => {

  return (
    <View style={styles.container}>
        
      <Header />

      <WebView
        style={styles.webView}
      />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  

  webView: {
    flex: 1,
  },

});

export { Browser };