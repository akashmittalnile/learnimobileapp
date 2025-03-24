import {View, Text} from 'react-native';
import React from 'react';

const SizeBox = ({height, width}) => {
  return (
    <View
      style={{
        height,
        width,
      }}
    />
  );
};

export default SizeBox;
