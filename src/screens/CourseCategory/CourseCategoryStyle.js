// import {Colors, Constant} from 'global/Index';
import {Platform, StyleSheet} from 'react-native';
import { dimensions } from '../../global/Constants';
import { LIGHT_PURPLE } from '../../global/Color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  mainView: {
    padding: 20,
    paddingTop: 0,
    marginTop: -30,
  },
  categoryContainer: {
    width: (dimensions.SCREEN_WIDTH - 60) * 0.34,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    borderWidth:1,
    borderColor:LIGHT_PURPLE,
    alignSelf:'center',
  },
  catImg: {
    height: 58,
    width: 58,
    borderRadius: 78 / 2,
  },
});