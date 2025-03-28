import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Header from '../../component/Header/Header';
import BackgroundImage from '../../component/Background/BackgroundImage';
import LockLogo from '../../assets/images/lock1.svg';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomPasswordInput from '../../component/TextInput/CustomPasswordInput';
import Lock from '../../assets/images/lock.svg';
import BorderButton from '../../component/MyButton/BorderButton';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../component/loader/Loader';
import {Colors} from '../../global';
import Toast from 'react-native-toast-message';
import {API_Endpoints, PostApi} from '../../global/Service';

const ChangePassword = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const params = useRoute().params;
  const [password, setPassword] = useState({password: '', confirmPassword: ''});
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setPassword({password: '', confirmPassword: ''});
      setError({
        password: false,
        confirmPassword: false,
      });
    }
  }, [isFocused]);

  const onChangePassword = password => {
    setError(value => ({...value, password: false}));
    setPassword(value => ({...value, password: password}));
  };

  const onChangeConfirmPassword = confirmPassword => {
    setError(value => ({...value, confirmPassword: false}));
    setPassword(value => ({...value, confirmPassword: confirmPassword}));
  };

  const validator = () => {
    if (password.password?.length < 6) {
      setError(value => ({...value, password: true}));
    }
    if (
      password.confirmPassword?.length < 6 ||
      password.password !== password.confirmPassword
    ) {
      setError(value => ({...value, confirmPassword: true}));
    }
    return (
      password.password?.length > 5 &&
      password.confirmPassword?.length > 5 &&
      password.password === password.confirmPassword
    );
  };

  const savePasswordHandler = async () => {
    try {
      const result = validator();
      if (!result) {
        return;
      }
      setLoader(true);
      const response = await PostApi(API_Endpoints.resetPassword, {
        email: params?.email,
        otp: params?.otp,
        password: password.password,
      });
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
      if (response?.data?.status) {
        navigation.navigate('SIGN_IN');
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
          heading="Change Password"
          headingStyle={{color: 'black'}}
        />

        <View style={styles.logoContainer}>
          <LockLogo />
        </View>

        <Text style={styles.title}>Change Password</Text>

        <Text style={styles.description}>
          Enter your new password and {'\n'}confirm it
        </Text>

        <CustomPasswordInput
          value={password.password}
          Icon={<Lock />}
          placeholder="Password"
          onChangeText={onChangePassword}
          style={{
            ...styles.textInputStyle,
            borderColor: error.password ? 'red' : Colors.LIGHT_PURPLE,
          }}
        />

        <CustomPasswordInput
          value={password.confirmPassword}
          Icon={<Lock />}
          placeholder="Confirm Password"
          onChangeText={onChangeConfirmPassword}
          style={{
            ...styles.textInputStyle,
            borderColor: error.confirmPassword ? 'red' : Colors.LIGHT_PURPLE,
          }}
        />

        <BorderButton
          title="Save Password"
          onPress={savePasswordHandler}
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

export default ChangePassword;
