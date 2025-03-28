import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import {Colors, ScreenNames, Service} from 'global/index';
import {API_Endpoints, PostApi, PostApiWithToken} from '../../global/Service';
import MyText from 'component/MyText/MyText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CertificateCard from 'component/Certificate/CertificateCard';
import OrderHistoryTab from 'component/OrderHistory/OrderHistoryTab';
import MySearchBarForHome from 'component/MySearchBarForHome';
import NotificationCard from 'component/Notification/NotificationCard';

import {styles} from './NotificationStyle';
import {ScrollView} from 'react-native-virtualized-view';
import NotificationIcon from '../../assets/images/notification.svg';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {MEDIUM, REGULAR, SEMI_BOLD} from 'global/Fonts';
import MyButton from 'component/MyButton/MyButton';
import {useNavigation} from '@react-navigation/native';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import Toast from 'react-native-toast-message';

const Notification = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);
  console.log('notification', notification);
  const [loader, setLoader] = useState(false);
  const getNotification = async () => {
    setLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.notification,
        token,
      );
      if (status) {
        setNotification(response?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    } finally {
      setLoader(false);
    }
  };

  //clear all notification
  const clearNotification = async () => {
    setLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await PostApiWithToken(
        API_Endpoints.clearNotification,
        {},
        token,
      );
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
      if (response?.data?.status) {
        setNotification([]);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);

  const backToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ScreenNames.BOTTOM_TAB}],
    });
  };

  return (
    <View style={styles.container}>
      <Background style={StyleSheet.absoluteFill} />
      <Header
        // showNotification={true}
        heading={'Notifications'}
        showLearneLogo={false}
        showCart={false}
        showBackButton={true}></Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={getNotification} />
        }>
        {notification?.length > 0 && (
          <TouchableOpacity onPress={() => clearNotification()}>
            <MyText
              text={'Clear All'}
              fontFamily={'regular'}
              fontSize={14}
              textColor="green"
              style={{textAlign: 'right', marginRight: 12, marginTop: 10}}
            />
          </TouchableOpacity>
        )}
        {notification?.length > 0 && (
          <NotificationCard
            orderHistoryData={notification}
            // viewDetails={viewDetails}
          />
        )}
        {notification?.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: responsiveHeight(15),
            }}>
            <NotificationIcon height={110} width={110} />
            <Text
              style={{
                marginTop: 3,
                fontSize: 20,
                fontFamily: MEDIUM,
                color: Colors.BLACK,
              }}>
              No notifications yet
            </Text>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 16,
                fontFamily: REGULAR,
                color: Colors.BLACK,
              }}>
              Stay Connected! and Informed
            </Text>
            <Text
              style={{fontSize: 16, fontFamily: REGULAR, color: Colors.BLACK}}>
              with Our Notification Center
            </Text>

            <MyButton
              onPress={backToHome}
              text="Back to home"
              style={{
                marginTop: 30,
                height: responsiveHeight(7),
                width: '90%',
                backgroundColor: '#5E4AF7',
              }}
            />
          </View>
        )}
      </ScrollView>
      {loader && <ListLoader />}
    </View>
  );
};

export default Notification;
