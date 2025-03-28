import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';
import OpenEye from 'assets/images/eye.svg';
import Eye from 'assets/images/eye-slash.svg';

const CustomPasswordInput = ({
  placeholder,
  Icon,
  style,
  onChangeText,
  value,
}) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const EyeIconHandler = () => {
    setSecureEntry(value => !value);
  };
  return (
    <View style={[styles.container, style]}>
      {Icon && <View style={styles.iconContainer}>{Icon}</View>}
      <TextInput
        value={value}
        secureTextEntry={secureEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8F93A0"
        style={{...styles.textInput}}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={EyeIconHandler}>
          {secureEntry ? <Eye /> : <OpenEye />}
        </TouchableOpacity>
      </View>
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
     fontSize: responsiveFontSize(2),
    height: '100%',
    width: '80%',
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
  },
});

export default CustomPasswordInput;
