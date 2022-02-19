import React from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator, Text } from 'react-native';
import { ICONS } from '@assets';
import { IconButton } from './IconButton';

const HEIGHT_HEADER = 60;
const PADDING = 8;
const HEIGHT_INPUT_ADDRESS = HEIGHT_HEADER - 8 * 2;
const ICON_SIZE = 30;

interface HeaderBrowserProps {
  onPressHome(): void
  onPressBack(): void
  onPressNext(): void
  onPressRefresh(): void
  onChangeText(text: string): void
  onPressGoToUrl(): void
  onPressClearText(): void
  isLoading: boolean
  urlText: string
  canGoNext: boolean
  canGoBack: boolean
  
}

const HeaderBrowser: React.FC<HeaderBrowserProps> = (props) => {

  const {
    onPressHome, onPressBack, onPressNext, onPressRefresh,
    onChangeText, onPressGoToUrl, onPressClearText,
     isLoading, urlText, canGoNext, canGoBack,
    
  } = props;



  return (
    <View style={styles.header}>
      <IconButton icon={ICONS.ICON_HOME} onPress={onPressHome} />
      <View style={styles.search}>
        <TextInput
          style={styles.inputAddress}
          placeholder="Search or type web address"
          value={urlText}
          onChangeText={onChangeText}
          returnKeyType={"go"}
          onSubmitEditing={onPressGoToUrl}
          selectTextOnFocus={true}
          autoCapitalize="none"
        />
          <View style={styles.headerRight}>
            {isLoading && <ActivityIndicator color="#0000ff" />}
            {urlText.length > 0 && <IconButton icon={ICONS.ICON_CLEAR_TEXT} onPress={onPressClearText} />}
          </View>
      </View>
      <IconButton icon={ICONS.ICON_BACK} onPress={onPressBack} isDisable={!canGoBack}/>
      <IconButton icon={ICONS.ICON_REFRESH} onPress={onPressRefresh} />
      <IconButton icon={ICONS.ICON_NEXT} onPress={onPressNext} isDisable={!canGoNext}/>
    </View>
  );

}

const styles = StyleSheet.create({
  header: {
    height: HEIGHT_HEADER,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E8E3E2',
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E3E2',
    height: HEIGHT_INPUT_ADDRESS,
    marginVertical: PADDING,
    paddingHorizontal: PADDING,
    borderRadius: 20,
    flexDirection: 'row',
  },
  inputAddress: {
    flex: 1,
    height: HEIGHT_INPUT_ADDRESS,
  },
  headerRight: {
    alignSelf: 'center',
    flexDirection: 'row',
  },

});

export { HeaderBrowser };