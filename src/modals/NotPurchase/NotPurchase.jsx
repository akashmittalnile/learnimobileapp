import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './NotPurchaseStyle';
import MyText from 'component/MyText/MyText';
import {Colors, MyIcon} from 'global/index';
import MyButton from 'component/MyButton/MyButton';
import {BOLD} from 'global/Fonts';
import SizeBox from 'component/SizeBox/SizeBox';
const NotPurchase = ({visible, setVisibility}) => {
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <View
            style={{
              width: '70%',
              alignSelf: 'center',
            }}>
            <MyIcon.AntDesign
              name="questioncircle"
              size={70}
              color={Colors.GREEN}
              style={{
                alignSelf: 'center',
              }}
            />
            <SizeBox height={10} />
            <MyText
              text={'You have not purchased this course.'}
              fontFamily={BOLD}
              fontSize={18}
              textAlign="center"
              marginVertical={10}
            />
            <MyText
              text={'Please buy this course to access the contents.'}
              textAlign="center"
              marginVertical={10}
            />
            {/* <MyButton text={'Purchase'} /> */}
            <SizeBox height={10} />
            <TouchableOpacity onPress={() => closeModal()}>
              <MyText
                text={'Close'}
                style={{alignSelf: 'center'}}
                fontFamily={BOLD}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotPurchase;
