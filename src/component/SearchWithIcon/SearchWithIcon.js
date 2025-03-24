import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Search from 'assets/images/search.svg';
import {styles} from './SearchWithIconStyle';
import {Colors} from 'global/index';

const SearchWithIcon = ({
  placeholder = 'Search here',
  placeholderTextColor = Colors.BLACK,
  value,
  setValue,
  icon, // Accepting icon as a prop
  onChangeText,
  onPress = () => {},
  showDot = () => {},
  style = {},
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...style,
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.inputStyle}
      />
      <TouchableOpacity onPress={onPress} style={styles.iconView}>
        {icon ? icon : <Search />}
        {showDot() ? <View style={styles.dot} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default SearchWithIcon;
