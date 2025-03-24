import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import ArrowLeft from 'assets/images/arrowLeft.svg';
import Notification from 'assets/images/notification.svg';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Drawer from 'assets/images/drawer.svg';
import Logo from 'assets/svgs/logoLearne.svg';
import Cart from 'assets/images/shoppingBag.svg';
import {Colors, ScreenNames} from 'global/index';
import {useSelector} from 'react-redux';
import {API_Endpoints, GetApiWithToken} from 'global/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({
  heading,
  onPressBack,
  onPressNotification,
  toggleSidebar,
  gradient = false,
  showBackButton = true,
  showNotification = false,
  showGridIcon = false,
  headingStyle = {},
  toggleSwitch = false,
  showLearneLogo = true,
  showCart = true,
  onSwitchToggle = isOn => console.debug('changed to : ', isOn),
  isSwitchOn = false,
  style,
}) => {
  const navigation = useNavigation();
  const cartCount = useSelector(state => state.count?.cartCount);
  const focused = useIsFocused();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    focused && getNotificationCount();
  }, [focused]);

  const getNotificationCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await GetApiWithToken(API_Endpoints.notification, token);
      if (response?.data?.status) {
        setNotificationCount(response?.data?.data?.length);
      }
    } catch (err) {
      console.error('error in getting notification count in header', err);
    }
  };

  const onPressBackHandler = () => {
    // onPressBack && onPressBack();
    navigation?.goBack();
  };
  const onPressNotificationHandler = () => {
    navigation.navigate(ScreenNames.NOTIFICATION);
  };
  const openCart = () => {
    navigation.navigate(ScreenNames.CART);
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };

  // Update notification count on screen focus

  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        !gradient && {
          flexDirection: 'row',
          // height: 114,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.3,
          shadowRadius: 4,
          // Android Shadow
          elevation: 5,
        },
      ]}>
      <>
        <View
          style={[
            styles.card,
            {justifyContent: 'space-between', paddingLeft: responsiveWidth(4)},
          ]}>
          {showGridIcon && (
            <TouchableOpacity onPress={openDrawer}>
              {/* <Icon name="grid-outline" size={24} color="white" /> */}
              <Drawer></Drawer>
            </TouchableOpacity>
          )}

          {showBackButton && (
            <TouchableOpacity onPress={onPressBackHandler}>
              <ArrowLeft />
            </TouchableOpacity>
          )}
        </View>

        <View style={{...styles.card, flex: 4, justifyContent: 'center'}}>
          {heading && (
            <Text style={[styles.heading, headingStyle]}>{heading}</Text>
          )}
          {showLearneLogo && <Logo width={131} height={54}></Logo>}
        </View>

        <View style={[styles.card, {paddingRight: responsiveWidth(4)}]}>
          {showCart && (
            <TouchableOpacity
              onPress={openCart}
              style={{position: 'relative', marginRight: responsiveWidth(2)}}>
              <Cart height={24} width={24} />
              {cartCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -5,
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: Colors.GREEN,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          {showNotification && (
            <TouchableOpacity
              onPress={onPressNotificationHandler}
              style={{
                position: 'relative',
                marginLeft: responsiveWidth(showCart ? 0 : 13),
              }}>
              <Notification height={24} width={24} />
              {notificationCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -5,
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#FF8615',
                  }}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  gradientContainer: {
    flexDirection: 'row',
    paddingTop: NativeModules.StatusBarManager.HEIGHT,
    // paddingBottom: responsiveHeight(1),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    flexDirection: 'row',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {},
  heading: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: 'black',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    minHeight: 64,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // Debugging borders
  },
  thumbOnStyle: {
    backgroundColor: 'yellow', // Dot color when on
  },
  thumbOffStyle: {
    backgroundColor: 'yellow', // Dot color when off
  },
});
