//import : react component
import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
import SizeBox from 'component/SizeBox/SizeBox';
import Loader from 'component/loader/Loader';
//import : third party
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {BLACK} from 'global/Fonts';
import {Colors, MyIcon, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
//import : styles
import {styles} from './ReviewStyle';
//import : modals
//import : redux

const Review = ({
  visible,
  setVisibility,
  id,
  nextFunction = () => {},
  style,
}) => {
  //variables
  let starArray = [1, 2, 3, 4, 5];
  //hook : states
  const [selectedStar, setSelectedStar] = useState(1);
  const [reviewMsg, setReviewMsg] = useState('');
  //hook : modal state
  const [showAppLoader, setShowAppLoader] = useState(false);
  //function : modal func
  const closeModal = () => {
    setSelectedStar(1);
    setReviewMsg('');
    setVisibility(false);
  };
  //function : serv func
  const submitReview = async () => {
    setShowAppLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        id: id,
        type: 1,
        rating: selectedStar,
        review: reviewMsg,
      };
      const {response, status} = await Service.postAPI(
        API_Endpoints.submit_rating,
        data,
        token,
      );
      if (status) {
        closeModal();
        nextFunction(response.message);
      } else {
        closeModal();
        nextFunction(response.message);
      }
    } catch (error) {
      console.error('error in submitReview', error);
    }
    setShowAppLoader(false);
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{...styles.container, ...style}}>
        <TouchableOpacity
          style={styles.blurView}
          onPress={() => closeModal()}
        />
        <View style={styles.mainView}>
          <MyText
            text={'Rating & Review'}
            fontFamily={BLACK}
            fontSize={18}
            textColor={'black'}
            textAlign="center"
            style={{width: '95%'}}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              columnGap: 10,
              marginVertical: 10,
            }}>
            {starArray.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedStar(item)}
                  key={index.toString()}>
                  <MyIcon.AntDesign
                    name={item <= selectedStar ? 'star' : 'staro'}
                    size={24}
                    color={Colors.YELLOW}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            value={reviewMsg}
            style={styles.reviewInput}
            underlineColorAndroid="transparent"
            placeholder={'Type your review here…'}
            placeholderTextColor="#999999"
            textAlignVertical="top"
            numberOfLines={10}
            multiline={true}
            onChangeText={e => setReviewMsg(e)}
          />
          <SizeBox height={10} />
          <MyButton text={'Submit'} onPress={() => submitReview()} />
          <SizeBox height={10} />
          <MyButton
            text={'Cancel'}
            backgroundColor={Colors.RED}
            onPress={() => closeModal()}
          />
        </View>
      </View>
      <Loader visible={showAppLoader} />
    </Modal>
  );
};

export default Review;
