/* eslint-disable react/no-unstable-nested-components */
//react components
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
//custom components

//Bottom Tab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//global
import {BOLD, EXTRA_BOLD, BLACK} from '../../global/Fonts';
import {styles} from './BottomTabStyle';
import Home from '../../screens/Home/Home';
import HomeInactive from 'assets/images/homeInactive.svg';
import HomeActive from 'assets/images/homeActive.svg';

import Color from '../../global/Color';
import OrderInactive from 'assets/images/orderInactive.svg';
import OrderActive from 'assets/images/orderActive.svg';
import ProfileInactive from 'assets/images/profileInactive.svg';
import ProfileActive from 'assets/images/profileActive.svg';
import WishListInactive from 'assets/images/wishListInactive.svg';
import WishListActive from 'assets/images/wishlistActive.svg';

import WishList from '../../screens/WishList/WishList';
import Order from '../../screens/Order/Order';
import Profile from '../../screens/Profie/Profile';
//import Wi//logos

//screens

const BottomTab = ({userToken}) => {
  // const userInfo = useSelector(state => state.user.userInfo);
  //variables
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    showLabel: false,
    headerShown: false,
    tabBarShowLabel: false,

    tabBarStyle: {
      ...styles.navigatorStyle,
      backgroundColor: 'white', // Ensures no white space behind the tab bar
    },
    // tabBarBackground: () => (
    //     <LinearGradient
    //         colors={['rgba(0, 0, 0, 0.78)', 'rgba(35, 35, 35, 1)']}
    //         style={StyleSheet.absoluteFillObject} // Ensure the gradient fully covers the tab bar
    //     />
    // ),
  };

  return (
    <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <HomeActive height={24} width={24}></HomeActive>
              ) : (
                <HomeInactive height={24} width={24}></HomeInactive>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? '#5E4AF7' : 'black',
                  marginTop: 5,
                  fontFamily: BLACK,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Wishlist'}
        component={WishList}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <WishListActive height={24} width={24}></WishListActive>
              ) : (
                <WishListInactive height={24} width={24}></WishListInactive>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? '#5E4AF7' : 'black',
                  marginTop: 5,
                  fontFamily: BLACK,
                }}>
                Wishlist
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Order'}
        component={Order}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <OrderActive height={24} width={24}></OrderActive>
              ) : (
                <OrderInactive height={24} width={24}></OrderInactive>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? '#5E4AF7' : 'black',
                  marginTop: 5,
                  fontFamily: BLACK,
                }}>
                My Orders
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <ProfileActive height={24} width={24}></ProfileActive>
              ) : (
                <ProfileInactive height={24} width={24}></ProfileInactive>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? '#5E4AF7' : 'black',
                  marginTop: 5,
                  fontFamily: BLACK,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
