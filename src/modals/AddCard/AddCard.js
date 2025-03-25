//import : react components
import React, {useState} from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
import Loader from 'component/loader/Loader';
//import : third parties
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardField, createToken} from '@stripe/stripe-react-native';
//import : utils
import {Colors, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
import {dimensions} from 'global/Constants';
//import : styles
import {styles} from './AddCardStyle';

const AddCard = ({
  visible,
  setVisibility,
  callFunctionAfterAddingcard = () => {},
}) => {
  //hook : states
  const [showLoader, setShowLoader] = useState(false);
  const [card, setCard] = useState(null);
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //function : serv func
  const onAddCard = async () => {
    if (card === 0) {
      Toast.show({text1: 'Please enter card details'});
      return;
    } else if (!card?.complete) {
      Toast.show({text1: 'Please enter a valid card details'});
      return;
    }
    setShowLoader(true);
    try {
      const res = await createToken({card, type: 'Card'});
      const token = await AsyncStorage.getItem('token');
      const postData = {
        stripeToken: res?.token?.id,
      };
      const {response, status} = await Service.postAPI(
        API_Endpoints.add_card,
        postData,
        token,
      );
      console.log('response', response);

      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        callFunctionAfterAddingcard('5');
        closeModal();
      } else {
        Toast.show({text1: response?.message});
      }
    } catch (error) {
      console.log('error in onAddCard', error);
    } finally {
      setShowLoader(false);
    }
  };

  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyText
            text="Add New Card"
            textColor={'black'}
            fontSize={20}
            textAlign="center"
            style={{marginBottom: 20}}
          />
          <CardField
            postalCodeEnabled={true}
            onCardChange={cardDetails => {
              setCard(cardDetails);
            }}
            style={{
              height: 50,
              marginVertical: 10,
              borderWidth: 0.2,
              borderColor: Colors.GREEN,
            }}
          />
          <MyButton
            text="ADD"
            style={{
              width: dimensions.SCREEN_WIDTH * 0.9,
              marginBottom: 10,
              backgroundColor: Colors.THEME_BROWN,
            }}
            onPress={() => onAddCard()}
          />
        </View>
      </View>

      <Loader visible={showLoader} />
      <Toast />
    </Modal>
  );
};

export default AddCard;
