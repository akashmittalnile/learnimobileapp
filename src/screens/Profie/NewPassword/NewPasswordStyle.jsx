import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
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
