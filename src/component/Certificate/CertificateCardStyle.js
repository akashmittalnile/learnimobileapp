import {StyleSheet} from 'react-native';
import {Colors, ScreenNames, Service} from 'global/index';
import {dimensions} from 'global/Constants';

export const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 11,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    borerRadius:1,
    borderColor:'#E0E0E0',
    borderWidth:1,
    width:dimensions.SCREEN_WIDTH*0.93,
    alignSelf:'center',
    borderRadius:10
  },
  courseSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crseImg: {
    height: 99,
    width: dimensions.SCREEN_WIDTH*0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crtrRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: Colors.THEME_BROWN,
  },
  courseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  tickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});