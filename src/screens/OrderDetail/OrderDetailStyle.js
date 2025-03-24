import { Colors } from 'global/index';
import {Platform, StyleSheet} from 'react-native';
import { dimensions } from 'global/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SCREEN_BG,
  },
  mainView: {
    padding: 20,
    paddingTop: 0,
    marginTop: -30,
  },
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
  courseSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crseImg: {
    height: 99,
    width: dimensions.dimensions * 0.33,
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
    marginLeft: 22,
    width: '80%',
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
  createImgStyle: {
    height: 13,
    width: 13,
    borderRadius: 13 / 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  summaryContainer: {
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountContainer: {
    backgroundColor: Colors.GREEN,
    overflow: 'hidden',
    width: '90%',
    borderRadius: 10,
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignSelf:'center'
  },
  whiteCircle2: {
    borderRadius: (17.15 * 2) / 2,
    width: 17.15 * 2,
    height: 17.15 * 2,
    backgroundColor: 'rgba(224, 178, 32, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle3: {
    borderRadius: (29 * 2) / 2,
    width: 29 * 2,
    height: 29 * 2,
    backgroundColor: '#653C3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    borderWidth:1,
    borderColor:'#CCCCFF',
    width:dimensions.SCREEN_WIDTH*0.89,
    alignSelf:'center',
    marginTop:20
  },
  cardContainerLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});