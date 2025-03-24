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
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';

//import : third parties

//import : global
import {Colors, ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './BillingTabStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'component/Divider/Divider';

import ViewAll from 'component/ViewAll/ViewAll';

const BillingTab = ({cardList, deleteCard, openAddCardModal}) => {
  return (
    <View style={{}}>
      <ViewAll
        text="Saved Cards"
        buttonText="Add New"
        style={{marginTop: 25, marginBottom: 21, marginRight: 12}}
        onPress={openAddCardModal}
      />
      {cardList?.length > 0 ? (
        cardList?.map(item => (
          <View key={item.card_id} style={[styles.cardContainer]}>
            <View style={styles.cardContainerLeftRow}>
              {/* <Image
                source={{uri: item.card_image}}
                style={{height: 20, width: 20}}
              /> */}
              <View style={{marginLeft: 12}}>
                <MyText
                  text={'**** **** **** ' + item.card_number.slice(-5)}
                  fontSize={16}
                  fontFamily="medium"
                  textColor={'#261313'}
                />
                <MyText
                  text={`Expires ${item.valid_upto}`}
                  fontSize={14}
                  fontFamily="light"
                  textColor={Colors.LIGHT_GREY}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Delete Card',
                  'Are you sure you want to delee this card?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.debug('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => deleteCard(item.card_id)},
                  ],
                );
              }}>
              {/* <Image source={require('assets/images/trash.png')} /> */}
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <MyText
          text={`No saved cards found`}
          fontSize={18}
          fontFamily="regular"
          textColor={Colors.THEME_BROWN}
          style={{textAlign: 'center'}}
        />
      )}
    </View>
  );
};

export default BillingTab;
