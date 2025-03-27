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
import {BOLD, MEDIUM} from 'global/Fonts';
import {API_Endpoints} from 'global/Service';
import Toast from 'react-native-toast-message';
import Loader from 'component/loader/Loader';
const NewPassword = ({navigation}) => {
  //hook : states
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
      const {response, status} = await Service.postAPI(
        API_Endpoints.change_password,
        {
          email: params?.email,
          password: password.password,
        },
      );

      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (err) {
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
          fontFamily={BOLD}
          fontSize={18}
          textAlign="center"
        />
        <MyText
          text={`Enter your new password and \n confirm it`}
          fontFamily={MEDIUM}
          textAlign="center"
        />
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

export default NewPassword;
