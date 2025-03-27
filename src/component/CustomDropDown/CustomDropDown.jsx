import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from './CustomDropDownStyle';
const CustomDropDown = ({
  DD_Data = [],
  value,
  setValue = () => {},
  onFocus = () => {},
  placeholder = 'Select item',
  disable = false,
}) => {
  //hook : states
  const [isFocus, setIsFocus] = useState(false);

  //UI
  return (
    <View
      style={{
        backgroundColor: disable ? 'rgba(0,0,0,0.15)' : 'white',
        borderRadius: 8,
      }}>
      <Dropdown
        disable={disable}
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DD_Data}
        placeholder={placeholder}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => {
          setIsFocus(true);
          onFocus();
        }}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default CustomDropDown;
