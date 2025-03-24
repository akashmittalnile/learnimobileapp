//import : react components
import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : globals
import SuccessSvg from 'assets/svgs/success.svg';
import {Colors, ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './SuccesfulyPurchasedStyle';
import MyButton from 'component/MyButton/MyButton';
import {BOLD, REGULAR} from 'global/Fonts';

const SuccessfulyPurchased = ({visible, setVisibility, gotoMyCourses}) => {
  //variables : navigation
  const navigation = useNavigation();
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  const gotoMyCoursesPress = () => {
    closeModal();
    gotoMyCourses();
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} />
        <View style={styles.mainView}>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <SuccessSvg />
          </View>

          <MyText
            text="Successfully Purchased!"
            textColor={Colors.BLACK}
            fontSize={24}
            fontFamily={BOLD}
            textAlign="center"
            marginVertical={10}
          />
          <MyText
            text="Thank you for your purchase. You can now go to My Orders section and check the status."
            textColor={Colors.BLACK}
            fontSize={18}
            fontFamily={REGULAR}
            textAlign="center"
            marginVertical={10}
          />
          <MyButton text="MY ORDERS" onPress={gotoMyCoursesPress} />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessfulyPurchased;
