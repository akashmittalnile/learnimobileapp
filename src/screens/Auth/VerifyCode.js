import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Header from '../../component/Header/Header';
import BackgroundImage from '../../component/Background/BackgroundImage';
import PasswordCheck from '../../assets/images/password-check.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BorderButton from '../../component/MyButton/BorderButton';
import BorderLessButton from '../../component/MyButton/BorderLessButton';
import {OtpInput} from 'react-native-otp-entry';
import {Colors} from '../../global';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../component/loader/Loader';
import {API_Endpoints, PostApi} from '../../global/Service';
import Toast from 'react-native-toast-message';

const VerifyCode = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const params = useRoute().params;
  const otpRef = useRef();
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [tempOtp, setTempOtp] = useState('');

  useEffect(() => {
    if (isFocused) {
      setTempOtp(params?.otp);
      otpRef.current?.clear();
    }
  }, [isFocused]);

  const resendOtp = async () => {
    try {
      otpRef.current?.clear();
      setLoader(true);
      const response = await PostApi(API_Endpoints.forgotPassword, {
        email: params?.email,
      });
      if (response?.data?.status) {
        setTempOtp(response?.data?.data?.otp);
      }
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
    } catch (err) {
      console.error('error in resending otp to registered email', err);
    } finally {
      setLoader(false);
    }
  };

  const verifyOtp = async () => {
    try {
      if (otp?.length < 4) {
        return;
      }
      setLoader(true);
      const response = await PostApi(API_Endpoints.otpVerification, {
        email: params?.email,
        otp,
      });
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
      if (response?.data?.status) {
        navigation.navigate('CHANGE_PASSWORD', {
          email: params?.email,
          otp,
        });
      }
    } catch (err) {
      console.error('error in verifying otp', err);
    } finally {
      setLoader(false);
    }
  };

  const onChangeotp = text => {
    setOtp(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <BackgroundImage />
        <Header
          showLearneLogo={false}
          heading="Verification Code"
          headingStyle={{color: 'black'}}
        />

        <View style={styles.logoContainer}>
          <PasswordCheck />
        </View>

        <Text style={styles.title}>Wohoo!!!</Text>

        <Text style={styles.description}>We have sent you a verification</Text>

        <View style={styles.emailTextContainer}>
          <Text style={styles.emailText}>code to</Text>
          <Text
            style={{
              ...styles.emailText,
              color: Colors.GREEN,
            }}>{` (${
            params?.email ? `${params?.email} ${tempOtp}` : ''
          })`}</Text>
        </View>

        <OtpInput
          ref={otpRef}
          numberOfDigits={4}
          focusColor={Colors.GREEN}
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={onChangeotp}
          
          theme={{
            containerStyle: styles.OtpContainer,
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            pinCodeTextStyle: {
              color: 'black',
            }
          }}
        />

        <View style={styles.signupBtnContainerStyle}>
          <Text style={styles.text2}>Didn’t get OTP? </Text>
          <BorderLessButton
            title=" Resend"
            onPress={resendOtp}
            style={styles.signupBtnStyle}
            textStyle={styles.signupBtnTextStyle}
          />
        </View>

        <BorderButton
          title="Validated OTP"
          onPress={verifyOtp}
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
  emailTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveHeight(0.5),
  },
  emailText: {
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
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    width: '90%',
  },
  OtpContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1.5),
    width: responsiveWidth(70),
  },
  pinCodeContainerStyle: {
    height: responsiveHeight(7),
    width: responsiveHeight(7),
    borderWidth: responsiveWidth(0.21),
    borderRadius: responsiveWidth(2),
    borderColor: Colors.LIGHT_PURPLE,
    backgroundColor: 'white',
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
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
    color: Colors.GREEN,
    fontWeight: '500',
  },
  text2: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '400',
    color: 'black',
  },
});

export default VerifyCode;
