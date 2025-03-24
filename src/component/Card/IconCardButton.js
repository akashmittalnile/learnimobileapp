import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';
import ArrowRight from '../../assests/images/arrow-right.svg';
import {useNavigation} from '@react-navigation/native';

const IconCardButton = ({Icon, title, navigateTo, style, textStyle}) => {
  const navigation = useNavigation();
  const touchHandler = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <>{Icon && Icon}</>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.touch} onPress={touchHandler}>
        <ArrowRight />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: 'white',
    height: responsiveHeight(8),
    borderWidth: responsiveWidth(0.1),
    borderColor: Colors.LIGHT_PURPLE,
    borderRadius: responsiveWidth(2),
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: responsiveHeight(2.5),
    backgroundColor: Colors.LIGHT_PURPLE,
  },
  text: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
});

export default IconCardButton;
