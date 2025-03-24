import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {styles} from './MyTextInputStyle';

const MyTextInput = ({
  value,
  onChangeText = () => {},
  placeholder = 'Enter here',
  leftIcon,
  disabled = false,
}) => {
  return (
    <View style={{...styles.container, backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : 'white' }}>
      {leftIcon && leftIcon}
      <TextInput
        editable={!disabled}
        value={value}
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default MyTextInput;
