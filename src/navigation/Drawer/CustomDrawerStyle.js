import {StyleSheet} from 'react-native';
import {Colors} from 'global/index';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARK_PURPLE,
    padding: 35,
  },
  mainView: {
    padding: 20,
  },
  profileContentStyle: {
    width: '100%',
    backgroundColor: Colors.DARK_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  profileImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  viewProfileBtn: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    padding: 5,
  },
  versionText: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 5,
  },
});
