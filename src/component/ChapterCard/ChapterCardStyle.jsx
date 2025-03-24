import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 6,
    padding: 5,
  },
  serialContainer: {
    width: 28,
    height: 28,
    borderRadius: 23,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  chapterTitleView: {
    width: 'auto',
    height: 28,
    borderColor: Colors.DARK_PURPLE,
    borderWidth: 1,
    borderRadius: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
