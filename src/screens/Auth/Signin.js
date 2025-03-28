//import : react
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
//import : custom components
import BorderButton from 'component/MyButton/BorderButton';
import Loader from 'component/loader/Loader';
import Header from 'component/Header/Header';
import CustomTextInput from 'component/TextInput/CustomTextInput';
import CustomPasswordInput from 'component/TextInput/CustomPasswordInput';
import BorderLessButton from 'component/MyButton/BorderLessButton';
import BackgroundImage from 'component/Background/BackgroundImage';
//import : third party
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
//import : global
import {API_Endpoints, GetApiWithToken, PostApi} from 'global/Service';
import LearneLogo from 'assets/svgs/logoLearne.svg';
import EmailLogo from 'assets/images/sms.svg';
import PasswordLogo from 'assets/images/lock.svg';
//import : react-navigation
//import : redux
import {useDispatch} from 'react-redux';
import {setUser} from 'reduxTooklit/UserSlice';
import {Colors, ScreenNames} from 'global/index';

const Signin = () => {
  const tokenRef = useRef('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  //function : nav func
  const gotoBottomTab = () => {
    navigation.replace(ScreenNames.BOTTOM_TAB);
  };
  //hook : useEffect
  useEffect(() => {
    if (isFocused) {
      setUserDetails({
        email: '',
        password: '',
      });
      setError({
        email: false,
        password: false,
      });
    }
  }, [isFocused]);

  const onChangeEmail = email => {
    setError(val => ({...val, email: false}));
    setUserDetails(value => ({...value, email}));
  };

  const onChangePassword = password => {
    setError(val => ({...val, password: false}));
    setUserDetails(value => ({...value, password}));
  };

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setError(val => ({...val, email: true}));
    }
    if (userDetails.password?.length < 6) {
      setError(val => ({...val, password: true}));
    }
    return (
      emailRegex.test(userDetails.email) && userDetails.password?.length > 5
    );
  };

  const logoutHandler = async () => {
    try {
      setLoader(true);
      const response = await GetApiWithToken(
        API_Endpoints.logout,
        tokenRef.current,
      );
      if (response?.data?.status) {
        loginHandler();
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  const showAlert = msg => {
    Alert.alert(
      '',
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => console.debug('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Logout', onPress: logoutHandler},
      ],
      {cancelable: false},
    );
  };
  //function : serv func
  const loginHandler = async () => {
    try {
      const isValid = validator();
      if (!isValid) {
        return;
      }
      setLoader(true);
      const response = await PostApi(API_Endpoints.login, {
        email: userDetails.email,
        password: userDetails.password,
      });
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
      if (response?.data?.loggedin) {
        tokenRef.current = response?.data?.token;
        showAlert(response?.data?.message);
      } else if (response?.data?.status) {
        const data = response?.data?.data;
        await AsyncStorage.setItem('token', data?.access_token);
        dispatch(
          setUser({
            isAuth: data?.access_token,
            id: data?.user?.id,
            name: data?.user?.name,
            email: data?.user?.email,
            callingCode: data?.user?.country_code,
            cca2: data?.user?.cca2,
            mobile: data?.user?.mobile,
            profile: data?.user?.profile,
          }),
        );
        gotoBottomTab();
      }
    } catch (err) {
      console.error('getting error in login', err);
    } finally {
      setLoader(false);
    }
  };
  const goToSignup = () => {
    navigation.navigate(ScreenNames.SIGN_UP);
  };
  const goToForgotPassword = () => {
    navigation.navigate('FORGOT_PASSWORD');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <BackgroundImage />
        <Header
          showCart={false}
          showLearneLogo={false}
          heading="Sign In"
          headingStyle={{color: 'black'}}
        />
        <View style={styles.subContainer}>
          <LearneLogo height={responsiveHeight(8)} width="60%" />
          <CustomTextInput
            value={userDetails.email}
            onChangeText={onChangeEmail}
            placeholder="Email Address"
            Icon={<EmailLogo height={25} width={25} />}
            style={{
              marginTop: responsiveHeight(2.5),
              borderColor: error.email ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />
          <CustomPasswordInput
            value={userDetails.password}
            onChangeText={onChangePassword}
            placeholder="Password"
            Icon={<PasswordLogo height={25} width={25} />}
            style={{
              marginTop: responsiveHeight(1.5),
              borderColor: error.password ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />
          <BorderButton
            onPress={loginHandler}
            title="Sign In"
            style={{marginTop: responsiveHeight(4)}}
          />
          <BorderLessButton
            title="Forgot Your Password?"
            onPress={goToForgotPassword}
          />

          <View style={styles.line} />

          <View style={styles.signupBtnContainerStyle}>
            <Text style={styles.text2}>Don’t Have an Account?</Text>
            <BorderLessButton
              onPress={goToSignup}
              title=" Sign up"
              style={styles.signupBtnStyle}
              textStyle={styles.signupBtnTextStyle}
            />
          </View>
        </View>
      </ScrollView>
      <Loader visible={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  subContainer: {
    marginTop: responsiveHeight(10),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: responsiveHeight(6),
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    letterSpacing: 0.7,
    lineHeight: responsiveHeight(3.1),
  },
  line: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    height: responsiveHeight(0.1),
    width: '100%',
    backgroundColor: 'black',
  },
  signupBtnContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupBtnStyle: {
    width: 'auto',
  },
  signupBtnTextStyle: {
    color: Colors.DARK_PURPLE,
    fontWeight: '500',
  },
  text2: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '400',
    color: 'black',
  },
});

export default Signin;
