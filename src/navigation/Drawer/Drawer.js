//react components
import React from 'react';
//navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
//global

//stack
import AuthStack from 'navigation/AuthStack.js';
import CustomDrawer from './CustomDrawer.js';
import {SafeAreaView} from 'react-native';
import {Colors, ScreenNames} from 'global/index.js';
import BottomTab from 'navigation/BottomTab/BottomTab.js';
// import {NativeModules} from 'react-native';
const Drawer = ({}) => {
  //variables
  const Drawer = createDrawerNavigator(); // Correctly initializes the Drawer Navigator
  const initialRouteName = 'AuthStack'; // Proper declaration of initialRouteName
  const options = {
    swipeEnabled: false,
  };

  //function: render function for custom drawer content
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          // Customize drawer style if needed
        },
      }}
      initialRouteName={initialRouteName} // Use the variable for better readability
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="AuthStack" // Correct usage of Drawer.Screen
        options={options}
        component={AuthStack} // Pass AuthStack as the component
      />
      <Drawer.Screen name={ScreenNames.BOTTOM_TAB} component={BottomTab} />
    </Drawer.Navigator>
  );
};

export default Drawer;
