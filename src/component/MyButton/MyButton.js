//react components
import React, {useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
//global

//styles
import {styles} from './MyButtonStyle';
import MyText from '../MyText/MyText';
import {BLACK, MEDIUM, REGULAR} from '../../global/Fonts';
import {Colors} from 'global/index';

const MyButton = ({
  text,
  onPress = () => {},
  isWhite = false,
  style = {},
  isIcon = false,
  icon,
  textColor = 'white',
  disabled = false,
  backgroundColor = Colors.GREEN,
  width = '100%',
  height = 50,
}) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width,
      height,
      backgroundColor: isWhite ? 'white' : backgroundColor,
      ...style,
    },
  });
  const pressHandler = () => {
    if (disabled) {
      return;
    }
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={pressHandler}
      activeOpacity={disabled ? 1 : 0.5}
      style={styles.container}>
      {isIcon ? <Image source={icon} style={{marginRight: 14}} /> : null}
      <MyText
        text={text}
        fontSize={14}
        fontFamily={MEDIUM}
        textColor={isWhite ? 'red' : textColor}
        textAlign="center"
      />
    </TouchableOpacity>
  );
};

export default MyButton;
