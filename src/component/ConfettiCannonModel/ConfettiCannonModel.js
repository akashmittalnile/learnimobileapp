import React from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';
import BorderButton from '../MyButton/BorderButton';
import ConfettiCannon from 'react-native-confetti-cannon';

const ConfettiCannonModel = ({
  Icon,
  iconContainerStyle,
  title,
  description,
  buttonText,
  onPress,
  visible,
}) => {
  const _onPress = () => {
    onPress && onPress();
  };
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {Icon && (
            <View style={[styles.iconStyle, iconContainerStyle]}>{Icon}</View>
          )}

          {title && <Text style={styles.title}>{title}</Text>}

          {description && <Text style={styles.description}>{description}</Text>}

          <BorderButton
            title={buttonText}
            onPress={_onPress}
            style={styles.buttonStyle}
          />
          {/* <ConfettiCannon count={20} origin={{x: 0, y: 0}} /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(7),
    minHeight: responsiveHeight(43),
    backgroundColor: 'white',
    borderTopRightRadius: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(7),
    width: responsiveHeight(7),
    borderRadius: responsiveHeight(5),
    backgroundColor: Colors.GREEN,
  },
  title: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(4),
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
  },
  description: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  buttonStyle:{
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    width: '90%',
  }
});

export default ConfettiCannonModel;
