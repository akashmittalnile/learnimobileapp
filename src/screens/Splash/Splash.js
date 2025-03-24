//import : react
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
//import : global
import {ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './SplashStyle';
//import : assets
import Background from 'assets/svgs/background.svg';
import Logo from 'assets/svgs/logoLearne.svg';
import {API_Endpoints, GetApiWithToken} from 'global/Service';
//import : async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : redux
import {useDispatch} from 'react-redux';
//import : redux
import {setUser} from '../../reduxTooklit/UserSlice';

const Splash = ({navigation}) => {
  //variables
  const dispatch = useDispatch();
  //function : nav func
  const gotoBottomTab = () => {
    navigation.replace(ScreenNames.BOTTOM_TAB);
  };

  const getUserData = async token => {
    try {
      const {response, status} = await Service.getAPI(
        API_Endpoints.profile,
        token,
      );
      if (response?.data?.status) {
        const data = response?.data?.data;
        dispatch(
          setUser({
            isAuth: token,
            id: data?.id,
            name: data?.name,
            email: data?.email,
            callingCode: data?.country_code,
            cca2: data?.cca2,
            mobile: data?.mobile,
            profile: data?.profile,
          }),
        );

        gotoBottomTab();
      } else {
        await AsyncStorage.clear();
        navigation.replace(ScreenNames.WELCOME);
      }
    } catch (err) {
      'error in getting profile data in splash screen', err;
    }
  };

  const RenderThis = () => {
    return (
      <View style={styles.container}>
        {/* Background SVG */}
        <Background
          style={StyleSheet.absoluteFill}
          width="100%"
          height="100%"
        />

        {/* Logo SVG */}
        <View style={styles.logoContainer}>
          <Logo width={100} height={100} />
        </View>
      </View>
    );
  };
  //hook : useEffect
  useEffect(() => {
    const timer = setTimeout(async () => {
      // await AsyncStorage.clear();
      const token = await AsyncStorage.getItem('token');
      if (token) {
        getUserData(token);
      } else {
        navigation.replace(ScreenNames.WELCOME);
      }
    });

    return () => clearTimeout(timer);
  }, [navigation]);
  //UI
  return (
    <View style={styles.container}>
      {/* Background SVG */}
      <Background style={StyleSheet.absoluteFill} width="100%" height="100%" />

      {/* Logo SVG */}
      <View style={styles.logoContainer}>
        <Logo width={300} height={100} />
      </View>
    </View>
  );
};

export default Splash;
