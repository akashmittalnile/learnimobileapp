//import : react component
import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
import ImagePicker from 'react-native-image-crop-picker';
//import : utils
import {BOLD} from 'global/Fonts';
import {Colors, MyIcon} from 'global/index';
//import : styles
import {styles} from './AskMediaStyle';
//import : modals
//import : redux

const AskMedia = ({
  visible = false,
  setVisibility,
  nextFunction = () => {},
  multiple = false,
}) => {
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  //function : imp func
  const openCamera = async () => {
    try {
      await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        multiple,
      }).then(image => {
        nextFunction(image);
        closeModal();
      });
    } catch (error) {
      console.error('error in openCamera', error);
    }
  };
  const openGallery = async () => {
    try {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple,
      }).then(image => {
        nextFunction(image);
        closeModal();
      });
    } catch (error) {
      console.error('error in openGallery', error);
    }
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyText
            text={'Choose Media'}
            textAlign="center"
            fontSize={18}
            fontFamily={BOLD}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => openCamera()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyIcon.Feather name="camera" color={Colors.BLACK} size={30} />
              <MyText text={'Camera'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openGallery()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyIcon.AntDesign name="picture" color={Colors.BLACK} size={30} />
              <MyText text={'Gallery'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AskMedia;
