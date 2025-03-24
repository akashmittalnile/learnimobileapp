import React from 'react';
import { View, ViewStyle } from 'react-native';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
  borderBottomWidth?: number;
  marginVertical?: number;
}

const Divider: React.FC<DividerProps> = ({
  style = {},
  color = 'red',
  borderBottomWidth = 1,
  marginVertical = 0
}) => {
  return (
    <View
      style={[
        {
          borderBottomColor: color,
          borderBottomWidth,
          marginVertical
        },
        style
      ]}
    />
  );
};

export default Divider; 