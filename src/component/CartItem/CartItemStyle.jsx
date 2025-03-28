import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    columnGap: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 6,
  },
  delete:{
    position: 'absolute',
    top: 10, 
    right: 10
  }
});
