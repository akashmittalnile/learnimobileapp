import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './ImagePreviewStyle';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Colors, MyIcon} from 'global/index';
const ImagePreview = ({visible, images = [], setVisibility}) => {
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };

  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 100,
            backgroundColor: Colors.BLACK,
          }}>
          <MyIcon.Feather name="x-circle" color={Colors.WHITE} size={30} />
        </TouchableOpacity>
        <ImageViewer imageUrls={images} />
      </View>
    </Modal>
  );
};

export default ImagePreview;
