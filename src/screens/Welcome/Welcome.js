//import : react components
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import : custom components
import BackgroundImage from 'component/Background/BackgroundImage';
import BorderButton from 'component/MyButton/BorderButton';
//import : third party
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
//import : utils
import LearneLogo from 'assets/svgs/logoLearne.svg';
import {Colors, ScreenNames} from 'global/index';

const Welcome = () => {
  //variables
  const navigation = useNavigation();
  //function : nav func
  const goToSignin = () => {
    navigation.navigate(ScreenNames.SIGN_IN);
  };

  const goToSignup = () => {
    navigation.navigate(ScreenNames.SIGN_UP);
  };
  //UI
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <LearneLogo height={responsiveHeight(8)} width="60%" />
      <Text style={styles.text}>
        We now accept the fact that learning {'\n'}is a lifelong process of
        keeping abreast {'\n'}of change. And the most pressing task {'\n'}is to
        teach people how to learn.”
      </Text>

      <View style={styles.buttonContainer}>
        <BorderButton title="Sign In" onPress={goToSignin} />
        <BorderButton
          onPress={goToSignup}
          title="Sign Up"
          style={{
            marginTop: responsiveHeight(1),
            backgroundColor: Colors.DARK_PURPLE,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    marginTop: responsiveHeight(7),
    width: '90%',
  },
});

export default Welcome;
