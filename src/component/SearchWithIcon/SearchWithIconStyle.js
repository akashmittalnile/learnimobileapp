import {StyleSheet} from 'react-native';
import {YELLOW, LIGHT_PURPLE} from '../../global/Color';
import {Colors} from 'global/index';
export const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: 5,
    fontSize: 14,
    color: Colors.BLACK,
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: LIGHT_PURPLE,
    paddingLeft: 10,
  },
  iconView: {
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YELLOW,
    width: '18%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,
  },
  dot: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'black',
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
  },
});
