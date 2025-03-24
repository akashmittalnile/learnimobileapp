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
}) => {
  //hook : states
  const [isFocus, setIsFocus] = useState(false);

  //UI
  return (
    <View>
      <Dropdown
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
