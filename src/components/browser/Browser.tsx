import React, { useState, useRef } from 'react';
import { StyleSheet, View, RefreshControl, ActivityIndicator, ScrollView, Dimensions, Keyboard, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { HeaderBrowser } from './HeaderBrowser';

const TypeButton = {
  home: 'home',
  back: 'back',
  next: 'next',
  refresh: 'refresh',
}

interface BrowserProps {
  
}

const homeURL = "https://www.google.com.vn";

const Browser: React.FC<BrowserProps> = (props) => {

  const refWebView = useRef(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [isPullToRefreshEnabled, setPullToRefreshEnabled] = useState(typeof onRefresh === 'function');
  const [urlInput, setUrlInput] = useState(homeURL);
  const [currentURL, setCurrentURL] = useState(homeURL);
  const [canGoBack, setCanGoBack] = useState(true);
  const [canGoNext, seCanGoNext] = useState(true);
  const [pageTitle, setPageTitle] = useState(true);

  // refresh webview
  const onRefresh = () => {
    console.log('onRefresh', currentURL)
    if (refWebView.current) {
      setIsRefresh(true);
      refWebView.current.reload();
    }
  }

  // go to the next page
  const goNext = () => {
    if (refWebView.current && canGoNext) {
      refWebView.current.goForward();
    }
  };

  // go back to the last page
  const goBack = () => {
    if (refWebView.current && canGoBack) {
      refWebView.current.goBack();
    }
  };

  // go to the home page
  const goHome = () => {
    setCurrentURL(homeURL);
    setUrlInput(homeURL);
  };

  // onPress some other function: refresh, back page, next page, home
  const onPressFunction = (typeButton: string) => {
    switch(typeButton) {
      case TypeButton.home:
        goHome();
      break;
      case TypeButton.back:
        goBack();
      break;
      case TypeButton.refresh:
        onRefresh();
      break;
      case TypeButton.next:
        goNext();
      break;
      default:
        console.log('onPress icon button ', typeButton);
    }
  };

  // open input url
  const openURL = () => {
    const newURL = normalizeUrl(urlInput);
    console.log
    setCurrentURL(newURL);
    setUrlInput(newURL);
    Keyboard.dismiss();
  };

  // normalize url input -> adding https or search by google when user input text
  const normalizeUrl = (uri: string) => {
    const isURL = uri.split(' ').length === 1 && uri.includes('.');
    if (isURL) {
        if (!uri.startsWith('http')) {
            return 'https://www.' + uri;
        }
        return uri;
    }
    // not url -> perform search by google
    const encodedURI = encodeURI(uri);
    return `https://www.google.com/search?q=${encodedURI}`;
  };

  // update the text input
  const updateUrlInput = (text: string) => {
    setUrlInput(text);
  };

  // press clear text input address
  const onPressClearText = () => {
    setUrlInput("");
  };

  /**
   * 
   * Handle event WebView
   */

  // Function that is invoked when the WebView starts loading.
  const onBrowserStartLoad = () => {
    setLoading(true);
  };

  // Function that is invoked when the WebView load succeeds or fails.
  const onBrowserLoadEnd = () => {
    setLoading(false);
    setIsRefresh(false);
  };

  // when the webview is loaded
  const onBrowserLoad = (syntheticEvent) => {
    const { canGoForward, canGoBack, title } = syntheticEvent.nativeEvent;
    seCanGoNext(canGoForward);
    setCanGoBack(canGoBack);
    setPageTitle(title);
  };

  // when the webview has an error when loading url
  const onBrowserError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
};

  // after page loaded
  const onNavigationStateChange = (navState) => {
    const { canGoForward, canGoBack, title } = navState;
    seCanGoNext(canGoForward);
    setCanGoBack(canGoBack);
    setPageTitle(title);
  };

  // listener onscroll webview. scroll to top -> enable Refresh control
  const onScrollWebView = (syntheticEvent) => {
    setPullToRefreshEnabled(
      typeof onRefresh === 'function' &&
      syntheticEvent.nativeEvent.contentOffset.y === 0
    );
  };

  // render view when loading
  const _renderLoading = () => {
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  // render view when error load page
  const _renderError = () => {
    return (
      <View style={[StyleSheet.absoluteFill, styles.error]}>
        <Text>Ops! Something went wrong. Please try to refresh this page.</Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
        
      <HeaderBrowser
        onPressHome={()=>onPressFunction(TypeButton.home)}
        onPressBack={()=>onPressFunction(TypeButton.back)}
        onPressNext={()=>onPressFunction(TypeButton.next)}
        onPressRefresh={()=>onPressFunction(TypeButton.refresh)}
        isLoading={isLoading}
        urlText={urlInput}
        onChangeText={updateUrlInput}
        onPressGoToUrl={openURL}
        onPressClearText={onPressClearText}
        canGoNext={canGoNext}
        canGoBack={canGoBack}
      />

    <ScrollView
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={isRefresh}
          enabled={isPullToRefreshEnabled}
          tintColor="#0000ff"
          colors={["#0000ff", "#ff0000", "#ffff00"]}
        />
      }
      style={styles.view}>
        <WebView
          ref={refWebView}
          originWhitelist={['*']}
          source={{uri: currentURL}}
          onScroll={onScrollWebView}
          style={[styles.view, { height }]}
          // pullToRefreshEnabled={true}
          startInLoadingState={true}
          renderLoading={_renderLoading}
          onLoad={onBrowserLoad}
          onError={onBrowserError}
          onLoadStart={onBrowserStartLoad}
          onLoadEnd={onBrowserLoadEnd}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          renderError={_renderError}
        />
      </ScrollView>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: 'red',
  },
  view: {
    flex: 1,
    height: '100%'
  },
  error: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
  }

});

export { Browser };