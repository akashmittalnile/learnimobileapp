import {Colors, Constant} from 'global/Index';
import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../global/Constant';
import { GREEN } from '../../global/Color';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: {
    width: 63,
       height: 44,
       borderRadius: 5,
       backgroundColor: GREEN,
       justifyContent: 'center',
       alignItems: 'center',
       // Shadow for iOS
       shadowColor: '#000000',
       shadowOffset: {width: 0, height: 4},
       shadowOpacity: 0.05, // Equivalent to `#0000000D` (HEX opacity for 5%)
       shadowRadius: 13,
       // Shadow for Android
       elevation: 4,
  },
});