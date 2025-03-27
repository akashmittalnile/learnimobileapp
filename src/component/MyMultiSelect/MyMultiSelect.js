import React, {useRef, useState} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
//global
import {Colors} from 'global/Index';
import MyText from 'component/MyText/MyText';
import {styles} from './MyMultiSelectStyle';
import {AntDesign} from 'global/MyIcon';
import Toast from 'react-native-toast-message';
import Cross from 'assets/images/closecircle.svg';

import {MultiSelect} from 'react-native-element-dropdown';

const MyMultiSelect = ({value, setValue, data, placeholder, style = {}}) => {
  const dropdownRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>
          {typeof item.label === 'string'
            ? item.label
            : JSON.stringify(item.label)}
        </Text>
        {/* {value.find(el => el === item.value) && (
          <Image source={require('assets/images/checkbox-selected.png')} />
        )} */}
      </View>
    );
  };
  return (
    <MultiSelect
      ref={dropdownRef}
      style={[styles.dropdown, style]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      selectedStyle={{backgroundColor: 'green'}}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      value={Array.isArray(value) ? value : []} // ✅ Ensure it's an array
      onFocus={() => {
        setIsFocus(true);
        if (data?.length === 0) {
          Toast.show({text1: 'No orders found'});
        }
      }}
      onBlur={() => setIsFocus(false)}
      onChange={items => {
        setValue(Array.isArray(items) ? items : [items]); // Ensure it's an array
        setIsFocus(false);
        dropdownRef.current?.close();
      }}
      renderItem={renderItem}
      renderSelectedItem={(item, unSelect) => (
        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          <View style={styles.selectedStyle}>
            <Cross />
            <MyText
              text={
                typeof item.label === 'string'
                  ? item.label
                  : JSON.stringify(item.label)
              }
              textColor="black"
              fontSize={14}
              style={styles.textSelectedStyle}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default MyMultiSelect;
