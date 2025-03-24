import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: responsiveHeight(7),
    width: '100%',
    backgroundColor: 'white',
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: responsiveWidth(0.23),
    borderRadius: responsiveWidth(1.5),
    paddingHorizontal: responsiveWidth(2),
    marginVertical: responsiveWidth(1),
  },
  textInput: {
    height: '100%',
    width: '100%',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
  },
});
