import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NoDataFoundIcon from 'assets/images/NoData.svg';
import {BOLD, MEDIUM, SEMI_BOLD} from 'global/Fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const NoDataFound = ({text = 'No Data Found', style}) => {
  return (
    <View style={[styles.container, style]}>
      <NoDataFoundIcon
        height={responsiveHeight(15)}
        width={responsiveWidth(30)}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  text: {
    fontFamily: MEDIUM,
    fontSize: 40,
    textAlign: 'center',
    textColor: 'black',
  },
});

export default NoDataFound;
