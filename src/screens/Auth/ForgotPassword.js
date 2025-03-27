import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Header from '../../component/Header/Header';
import BackgroundImage from '../../component/Background/BackgroundImage';
import EmailLogo from '../../assets/images/sms-notification.svg';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomTextInput from '../../component/TextInput/CustomTextInput';
import _EmailLogo from '../../assets/images/sms.svg';
import BorderButton from '../../component/MyButton/BorderButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../component/loader/Loader';
import {API_Endpoints, PostApi} from '../../global/Service';
import Toast from 'react-native-toast-message';
import {Colors} from '../../global';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setEmail('');
      setError(false);
    }
  }, [isFocused]);

  const onChangeEmailText = email => {
    setError(false);
    setEmail(email);
  };

  const sendOtpToEmail = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError(true);
        return;
      }
      setLoader(true);
      const response = await PostApi(API_Endpoints.forgotPassword, {email});
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
      if (response?.data?.status) {
        navigation?.navigate('VERIFY_CODE', {
          email,
          otp: response?.data?.data?.otp,
        });
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <BackgroundImage />
        <Header
          showLearneLogo={false}
          heading="Forgot Password"
          headingStyle={{color: 'black'}}
        />

        <View style={styles.logoContainer}>
          <EmailLogo />
        </View>

        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.description}>
          We Will Send An 4 Digit OTP In Your {'\n'}Registered Email ID
        </Text>

        <CustomTextInput
          value={email}
          Icon={<_EmailLogo />}
          placeholder="Email Address"
          onChangeText={onChangeEmailText}
          style={{
            ...styles.textInputStyle,
            borderColor: error ? 'red' : Colors.LIGHT_PURPLE,
          }}
        />

        <BorderButton
          title="Reset Password"
          onPress={sendOtpToEmail}
          style={styles.buttonStyle}
        />
      </ScrollView>
      <Loader visible={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(7),
  },
  title: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  description: {
    alignSelf: 'center',
    marginTop: responsiveHeight(1.2),
    color: 'rgba(0,0,0,0.9)',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
    textAlign: 'center',
    lineHeight: responsiveHeight(2.2),
  },
  textInputStyle: {
    marginTop: responsiveHeight(2.5),
    alignSelf: 'center',
    width: '90%',
  },
  buttonStyle: {
    marginTop: responsiveHeight(2.5),
    alignSelf: 'center',
    width: '90%',
  },
});

export default ForgotPassword;
