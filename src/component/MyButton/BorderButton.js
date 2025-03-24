import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';

const BorderButton = ({title, onPress, style, textStyle}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={styles.touch}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(7),
    width: '100%',
    backgroundColor: Colors.GREEN,
    borderRadius: responsiveWidth(1.5),
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});

export default BorderButton;
