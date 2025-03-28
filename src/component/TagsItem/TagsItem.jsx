import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MyText from 'component/MyText/MyText';
import {styles} from './TagItemStyle';
import {MEDIUM} from 'global/Fonts';
const TagsItem = ({item, style}) => {
  return (
    <TouchableOpacity
      // onPress={() => changeSelectedTag(item.id)}
      style={{...styles.courseTypeContainer, ...style}}>
      <MyText
        text={item?.name}
        fontFamily={MEDIUM}
        textColor="white"
        fontSize={14}
      />
    </TouchableOpacity>
  );
};

export default TagsItem;
