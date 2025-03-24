import {dimensions} from 'global/Constants';
import { Colors } from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  courseContainer: {
    justifyContent: 'space-between',
    width: (dimensions.SCREEN_WIDTH - 40) * 0.74,

    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 16,
    // shadowColor: '#000',
    backgroundColor: 'white',  // Ensure the shadow is visible
    borderRadius: 10,  // Optional for smoother edges

    // iOS Shadow
    shadowColor: '#000',  // Black shadow color
    shadowOffset: { width: 0, height: 2 },  // Matches "0px 2px"
    shadowOpacity: 0.08,  // 0D in hex = ~0.05 - 0.08 opacity
    shadowRadius: 10,  // Matches "10px" blur effect

    // Android Shadow
    elevation: 5, // Approximate equivalent for Android
    borderWidth: 1,
    borderColor: Colors.LIGHT_PURPLE
  },
  crseImg: {
    height: 196,
    width: (dimensions.SCREEN_WIDTH - 40) * 0.74,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  bottomRow: {
height:'auto',

    paddingHorizontal: 10,
    marginTop:10,
    alignSelf: 'flex-start',
    alignItems: 'flex-start', // Ensures child items align to the start
    justifyContent: 'flex-start', // Align content to the top

   
  },
  courseNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
