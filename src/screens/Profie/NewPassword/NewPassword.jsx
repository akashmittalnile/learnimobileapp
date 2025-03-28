import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './NewPasswordStyle';
import Header from 'component/Header/Header';
import BackgroundImage from 'component/Background/BackgroundImage';
import Lock from 'assets/images/lock.svg';
import LockLogo from 'assets/images/lock1.svg';
import MyText from 'component/MyText/MyText';
import CustomPasswordInput from 'component/TextInput/CustomPasswordInput';
import {Colors, Service} from 'global/index';
import BorderButton from 'component/MyButton/BorderButton';
import {BOLD, MEDIUM, SEMI_BOLD} from 'global/Fonts';
import {API_Endpoints, PostApiWithToken} from 'global/Service';
import Toast from 'react-native-toast-message';
import Loader from 'component/loader/Loader';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NewPassword = ({navigation}) => {
  //hook : states
  const {params} = useRoute();
  const [password, setPassword] = useState({password: '', confirmPassword: ''});
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loader, setLoader] = useState(false);
  //function : imp func
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
      Toast.show({
        type: 'info',
        text1: 'Password should have at least 6 digits',
      });
      return
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
  //function : serv func
  const savePasswordHandler = async () => {
    try {
      const result = validator();
      if (!result) {
        return;
      }
      setLoader(true);
      const token = await AsyncStorage.getItem('token');
      const response = await PostApiWithToken(
        API_Endpoints.change_password,
        {
          email: params?.email,
          password: password.password,
        },
        token,
      );

      if (response?.data?.status) {
        navigation?.goBack();
      }
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
    } catch (err) {
      console.log('error in updating password', err);
    } finally {
      setLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <Header
        showLearneLogo={false}
        heading="Change Password"
        headingStyle={{color: 'black'}}
        showCart={false}
      />
      <BackgroundImage />
      <ScrollView style={styles.mainView} bounces={false}>
        <View style={{alignSelf: 'center'}}>
          <LockLogo />
        </View>

        <MyText
          text={'Change Password'}
          fontFamily={SEMI_BOLD}
          fontSize={18}
          textAlign="center"
        />
        <MyText
          text={`Enter your new password and \n confirm it`}
          fontFamily={MEDIUM}
          textAlign="center"
          style={{lineHeight: responsiveHeight(2.8)}}
        />
        <CustomPasswordInput
          value={password.password}
          Icon={<Lock />}
          placeholder="New Password"
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

export default NewPassword;
