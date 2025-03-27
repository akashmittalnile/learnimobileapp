import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import BackgroundImage from '../../component/Background/BackgroundImage';
import LearneLogo from 'assets/svgs/logoLearne.svg';
import EmailLogo from 'assets/images/sms.svg';
import UserLogo from 'assets/images/user.svg';
import PasswordLogo from 'assets/images/lock.svg';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BorderButton from '../../component/MyButton/BorderButton';
import Header from '../../component/Header/Header';
import CustomTextInput from '../../component/TextInput/CustomTextInput';
import CustomPasswordInput from '../../component/TextInput/CustomPasswordInput';
import CustomPhoneInput from '../../component/TextInput/CustomPhoneInput';
import BorderLessButton from '../../component/MyButton/BorderLessButton';
import {Colors, ScreenNames} from '../../global';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ConfettiCannonModel from '../../component/ConfettiCannonModel/ConfettiCannonModel';
import VectoreIcon from 'assets/images/Vector.svg';
import Loader from '../../component/loader/Loader';
import {API_Endpoints, PostApi} from '../../global/Service';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from 'reduxTooklit/UserSlice';

const SignUp = ({navigation}) => {
  //variables
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    number: false,
  });
  const [number, setNumber] = useState({
    number: '',
    cca2: 'US',
    callingCode: '1',
  });
  //function : nav func
  const gotoBottomTab = () => {
    navigation.replace(ScreenNames.BOTTOM_TAB);
  };
  useEffect(() => {
    if (isFocused) {
      setUserDetails({
        name: '',
        email: '',
        password: '',
      });
      setNumber({
        number: '',
        cca2: 'US',
        callingCode: '1',
      });
      setError({
        name: false,
        email: false,
        password: false,
        number: false,
      });
    }
  }, [isFocused]);

  const onChangeName = name => {
    setError(val => ({...val, name: false}));
    setUserDetails(val => ({...val, name}));
  };

  const onChangeEmail = email => {
    setError(val => ({...val, email: false}));
    setUserDetails(val => ({...val, email}));
  };

  const onChangePassword = password => {
    setError(val => ({...val, password: false}));
    setUserDetails(val => ({...val, password}));
  };

  const numberHandler = number => {
    setError(val => ({...val, number: false}));
    setNumber(value => ({...value, number}));
  };

  const countryCodeHandler = code => {
    setNumber(value => ({
      ...value,
      cca2: code?.cca2,
      callingCode: code?.callingCode[0],
    }));
  };

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setError(val => ({...val, email: true}));
    }
    if (userDetails.password?.length < 6) {
      setError(val => ({...val, password: true}));
    }
    if (userDetails.name?.length < 1) {
      setError(val => ({...val, name: true}));
    }
    if (number.number?.length < 14) {
      setError(val => ({...val, number: true}));
    }
    return (
      emailRegex.test(userDetails.email) &&
      userDetails.password?.length > 5 &&
      userDetails.name?.length > 0 &&
      number.number?.length > 13
    );
  };

  const signupHandler = async () => {
    try {
      const isvalid = validator();
      if (!isvalid) {
        return;
      }
      setLoader(true);
      const data = {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        country_code: '+' + number.callingCode,
        mobile: number.number?.replace(/\D/g, ''),
        cca2: number.cca2,
        image: '',
      };
      const response = await PostApi(API_Endpoints.register, data);
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });

      if (response?.data?.status) {
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
      console.error('error in registering user', err);
    } finally {
      setLoader(false);
    }
  };

  const goToSignIn = () => {
    navigation.navigate('SIGN_IN');
    showSuccessModal && setShowSuccessModal(false);
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <BackgroundImage />
        <Header
          showLearneLogo={false}
          heading="Sign Up"
          showCart={false}
          headingStyle={{color: 'black'}}
        />
        <View style={styles.subContainer}>
          <LearneLogo height={responsiveHeight(8)} width="60%" />

          <CustomTextInput
            value={userDetails.name}
            onChangeText={onChangeName}
            placeholder="Name"
            Icon={<UserLogo />}
            style={{
              marginTop: responsiveHeight(2.5),
              borderColor: error.name ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />

          <CustomTextInput
            value={userDetails.email}
            onChangeText={onChangeEmail}
            placeholder="Email Address"
            Icon={<EmailLogo />}
            style={{
              marginTop: responsiveHeight(1.5),
              borderColor: error.email ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />

          <CustomPhoneInput
            number={number?.number}
            onChangeNumber={numberHandler}
            onSelectCountryCode={countryCodeHandler}
            cca2={number?.cca2}
            callingCode={number?.callingCode}
            placeholder="Phone"
            maxLength={10}
            style={{marginTop: responsiveHeight(1.5)}}
            numberFieldContainerStyle={{
              borderColor: error.number ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />

          <CustomPasswordInput
            value={userDetails.password}
            onChangeText={onChangePassword}
            placeholder="Password"
            Icon={<PasswordLogo />}
            style={{
              marginTop: responsiveHeight(1.5),
              borderColor: error.password ? 'red' : Colors.LIGHT_PURPLE,
            }}
          />

          <BorderButton
            onPress={signupHandler}
            title="Sign Up"
            style={{marginTop: responsiveHeight(4)}}
          />

          <BorderLessButton
            title="Forgot Your Password?"
            onPress={goToForgotPassword}
          />

          <View style={styles.line} />

          <View style={styles.signupBtnContainerStyle}>
            <Text style={styles.text2}>Already Have an Account?</Text>
            <BorderLessButton
              onPress={goToSignIn}
              title=" Sign In"
              style={styles.signupBtnStyle}
              textStyle={styles.signupBtnTextStyle}
            />
          </View>
        </View>
      </ScrollView>

      <ConfettiCannonModel
        visible={showSuccessModal}
        Icon={<VectoreIcon />}
        title="Great!!!"
        description="Account Created Successfully"
        buttonText="Sign In"
        onPress={goToSignIn}
      />
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
    marginTop: responsiveHeight(7),
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

export default SignUp;
