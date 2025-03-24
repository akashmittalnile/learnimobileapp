//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MyText from '../MyText/MyText';
import {styles} from './ViewAllStyle';
import { WHITE } from '../../global/Color';
import { REGULAR,EXTRA_BOLD ,BOLD,SEMI_BOLD,MEDIUM} from 'global/Fonts';

const ViewAll = ({
  text,
  onPress,
  showSeeAll = true,
  style = {},
  buttonText = 'All',
}) => {
  return (
    <View style={[styles.container, style]}>
      <MyText
        text={text}
        fontFamily={MEDIUM}
        fontSize={18}
        // textColor={'#455A64'}
      />
      {showSeeAll ? (
        <TouchableOpacity onPress={onPress} style={styles.viewAll}>
          <MyText
            text={buttonText}
            fontFamily={MEDIUM}
            fontSize={18}
             textColor={WHITE}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ViewAll;