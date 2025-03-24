import {Colors, ScreenNames, Service} from 'global/index';
import {StyleSheet} from 'react-native';
import { dimensions } from 'global/Constants';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: dimensions.SCREEN_WIDTH,
    // height: 134,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#545454',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
    borderRadius: 10,
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    // margin: 20,
    backgroundColor: Colors.BLACK3,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: dimensions.SCREEN_HEIGHT / 2 - 40,
    width: 593,
    height: 117,
    borderColor: '#545454',
    borderWidth: 1,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginVertical: 10,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    // borderRadius: 5,
    // height: 50,
  },
  mmyCvvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});