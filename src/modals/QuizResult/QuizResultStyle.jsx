import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_PURPLE,
    borderRadius: 10,
    padding: 5,
    height: 100,
  },
});
