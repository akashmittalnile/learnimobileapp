import {dimensions} from 'global/Constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  courseContainer: {
    width: dimensions.SCREEN_WIDTH * 0.88,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 16,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderColor: '#E0E0E0',
    marginVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
    gap: 20,
    marginVertical: 15,
  },
  topLeftRow: {
    // backgroundColor:'blue',
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  crseImg: {
    height: 167,
    width: dimensions.SCREEN_WIDTH * 0.87,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
    paddingVertical: 4,
  },
  courseNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: dimensions.SCREEN_WIDTH * 0.8,
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
  },
});
