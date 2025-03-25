import {Colors, ScreenNames, Service} from 'global/index';
import {Platform, StyleSheet} from 'react-native';
import {width} from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    padding: 20,
  },
  summaryContainer: {
    padding: 12,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 22,
    borderRadius: 10,

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    margin: 2,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  cardContainerLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
