//import : react components
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
//import : stack
import AuthStack from 'navigation/AuthStack';
//import : notification
//import : third parties
import Toast from 'react-native-toast-message';
//import : globals
//import : redux
import {Provider} from 'react-redux';
import {store} from './src/reduxTooklit/Store';
import {StripeProvider} from '@stripe/stripe-react-native';
import Drawer from './src/navigation/Drawer/Drawer';
const App = () => {
  //function
  const navigationRef = createNavigationContainerRef();
  const publishable =
    'pk_test_51QyUTWAld9cSunswPAQF50ugZhqbxAdjEzISyxeOnKk7CcFuEZZErc9cAqCwC3AsaBM7xmb1KvbtlA8CsJAWuIlt00oXjFil7t';
  //UI
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
            <Toast />
          </NavigationContainer>
        </Provider>
      </StripeProvider>
    </>
  );
};
export default App;
