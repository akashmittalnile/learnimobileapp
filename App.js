//import : react components
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
//import : stack
import AuthStack from 'navigation/AuthStack';
//import : notification
//import : third parties
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
//import : globals
//import : redux
import {Provider} from 'react-redux';
import {store} from './src/reduxTooklit/Store';
import {StripeProvider} from '@stripe/stripe-react-native';
import Drawer from './src/navigation/Drawer/Drawer';
import {responsiveHeight} from 'react-native-responsive-dimensions';
const App = () => {
  //function
  const navigationRef = createNavigationContainerRef();
  const publishable =
    'pk_test_51QyUTWAld9cSunswPAQF50ugZhqbxAdjEzISyxeOnKk7CcFuEZZErc9cAqCwC3AsaBM7xmb1KvbtlA8CsJAWuIlt00oXjFil7t';
  //UI

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          height: 'auto',
          paddingVertical: responsiveHeight(1),
          borderLeftColor: 'green',
          minHeight: responsiveHeight(7),
        }}
        text1NumberOfLines={100}
        text2NumberOfLines={100}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={{
          height: 'auto',
          paddingVertical: responsiveHeight(1),
          borderLeftColor: 'red',
          minHeight: responsiveHeight(7),
        }}
        text1NumberOfLines={100}
        text2NumberOfLines={100}
      />
    ),
    info: props => (
      <InfoToast
        {...props}
        style={{
          height: 'auto',
          paddingVertical: responsiveHeight(1),
          borderLeftColor: '#FFDF00',
          minHeight: responsiveHeight(7),
        }}
        text1NumberOfLines={100}
        text2NumberOfLines={100}
      />
    ),
  };


  return (
    <>
      <StripeProvider
        publishableKey={
          'pk_test_51QyUTWAld9cSunswPAQF50ugZhqbxAdjEzISyxeOnKk7CcFuEZZErc9cAqCwC3AsaBM7xmb1KvbtlA8CsJAWuIlt00oXjFil7t'
        }>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            {/* <AuthStack /> */}
            <Drawer />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </Provider>
      </StripeProvider>
    </>
  );
};
export default App;
