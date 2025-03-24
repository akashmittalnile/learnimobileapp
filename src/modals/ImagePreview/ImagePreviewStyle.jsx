import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainView: {
    height: 'auto',
    width: '80%',
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
  },
});
