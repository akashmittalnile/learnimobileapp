import {StyleSheet} from 'react-native';
const randomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);
export const styles = StyleSheet.create({
  courseTypeContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: randomColor(),
    marginRight: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
