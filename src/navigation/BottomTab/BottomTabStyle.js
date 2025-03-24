import {Platform, StyleSheet} from 'react-native';
import { dimensions } from '../../global/Constants';

export const styles = StyleSheet.create({
    navigatorStyle: {
        height: 90,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: dimensions.SCREEN_WIDTH * 0.99,
        backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        borderTopWidth: 0, // Removes any border that could show a white line
        elevation: 5, // Android shadow
        shadowColor: '#000', // Shadow color
        shadowOffset: {
          width: 0,
          height: -2, // Shadow offset for the negative y-axis
        },
        shadowOpacity: 0.1, // Opacity for shadow
        shadowRadius: 10, // Blur radius for shadow
      },
      
  tabStyle: {
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? 0 : 20
    alignItems: 'center', // Centers icon and text horizontally
    justifyContent: 'center', // Centers icon and text vertically
    flexDirection: 'column',
  },
  customTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: '90%', // Align to the center of the tab
    marginLeft: -33, // Adjust to center the tab,
    backgroundColor: 'green',
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    height: 90,
    width: 100,
    marginTop: 20,
    // paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  tabBarItem: {
    alignItems: 'center', // Centers icon and text horizontally
    justifyContent: 'center', // Centers icon and text vertically
    flexDirection: 'column', // Ensures icon is above text
  },
});
