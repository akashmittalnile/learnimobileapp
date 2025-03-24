import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';

const CustomTextInput = ({placeholder, Icon, style, onChangeText, value}) => {
  return (
    <View style={[styles.container, style]}>
      {Icon && <View style={styles.iconContainer}>{Icon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8F93A0"
        style={{...styles.textInput}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: responsiveHeight(7),
    width: '100%',
    backgroundColor: 'white',
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: responsiveWidth(0.23),
    borderRadius: responsiveWidth(1.5),
  },
  iconContainer: {
    marginLeft: responsiveWidth(2),
  },
  textInput: {
    height: '100%',
    width: '100%',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
  },
});

export default CustomTextInput;
