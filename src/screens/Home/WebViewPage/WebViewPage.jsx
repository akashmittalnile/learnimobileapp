//import : react component
import React from 'react';
import {View} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
//import : third party
import {WebView} from 'react-native-webview';
//import : utils
//import : styles
import {styles} from './WebViewPageStyle';
import {ScreenNames} from 'global/index';
//import : modals
//import : redux

const WebViewPage = ({route, navigation}) => {
  //variables
  const {url, data} = route.params;
  //function : imp func
  const handleNavigationStateChange = navState => {
    // setLoading(navState.loading);
    if (navState.url == 'https://nileprojects.in/learni/api/blank') {
      navigation.reset({
        index: 1,

        routes: [
          {name: ScreenNames.BOTTOM_TAB},
          {name: ScreenNames.CHAPTER_DETAIL, params: {data}},
        ],
      });
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <Header showBackButton showLearneLogo={false} showCart={false} />
      <WebView
        source={{uri: url}}
        style={{flex: 1}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

export default WebViewPage;
