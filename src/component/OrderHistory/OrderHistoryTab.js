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
} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';

//import : global

//import : styles
import {styles} from './OrderHistoryTabStyle';
//import : modal
//import : redux
import {Colors, ScreenNames, Service} from 'global/index';
import {dimensions} from 'global/Constants';
import {REGULAR, BLACK, BOLD, MEDIUM} from 'global/Fonts';
import Divider from 'component/Divider/Divider';
import Eye from 'assets/images/eyeCertificate.svg';

import MyButton from 'component/MyButton/MyButton';
import Certicate from 'assets/images/certificate.svg';
import Profile from 'assets/images/profilePerson.svg';
import Rating from 'assets/images/rating.svg';
import Download from 'assets/images/downloadVector.svg';

const OrderHistoryTab = ({orderHistoryData, viewDetails,navigation}) => {
  const renderOrder = ({item}) => {
    return (
      <View style={styles.courseContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}>
          <View style={{flexDirection: 'row'}}>
            <MyText
              text={'Order number:'}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#000000'}
              style={{}}
            />
            <MyText
              text={' #8787387'}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#5E4AF7'}
              style={{}}
            />
          </View>

          <MyText
            text={'10h ago'}
            fontFamily={MEDIUM}
            fontSize={14}
            textColor={'#5E4AF7'}
            style={{}}
          />
        </View>
        <Divider style={{marginBottom: 15}} color="#E0E0E0"></Divider>
        <View style={styles.courseSubContainer}>
          {/* <ImageBackground source={item.courseImg} style={styles.crseImg}> */}
          {/* <TouchableOpacity>
            <Image source={require('assets/images/play-icon.png')} />
          </TouchableOpacity> */}
          {/* </ImageBackground> */}

          <Image
            source={require('../../assets/images/orderHistory.png')}
            style={{width: 130, height: 97}}></Image>
          <View style={{marginLeft: 11, width: dimensions.SCREEN_WIDTH * 0.5}}>
            <MyText
              text={item.courseName}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#000000'}
              style={{width: dimensions.SCREEN_WIDTH * 0.55}}
            />
            <View style={styles.middleRow}>
              <View style={styles.crtrRow}>
                <MyText
                  text={'$'}
                  fontFamily={MEDIUM}
                  fontSize={16}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{}}
                />
                <MyText
                  text={'599'}
                  fontFamily={MEDIUM}
                  fontSize={16}
                  textColor={'#5E4AF7'}
                  letterSpacing={0.13}
                  style={{}}
                />
              </View>
              <View style={[styles.ratingRow, {marginLeft: 16}]}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Image resizeMode='contain' source={require('assets/images/star.png')} style={{height:12,minWidth:12}} /> */}
                  <Rating
                    style={{marginLeft: 24}}
                    height={18}
                    width={18}></Rating>
                </View>
                <MyText
                  text={item.courseRating}
                  fontFamily={REGULAR}
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 20, marginTop: 2}}
                />
              </View>
            </View>
          </View>
        </View>
        <Divider style={{marginTop: 12}} color="#E0E0E0"></Divider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '98%',
            marginTop: 10,
          }}>
          <MyButton
            text={'View Order Details'}
            style={{flex: 1, marginRight: 10, backgroundColor: '#5E4AF7'}}
            onPress={() => {
              navigation.navigate(ScreenNames.ORDER_DETAIL);
            }}
          />
          <MyButton
            text={'Download Invoice'}
            style={{flex: 1, backgroundColor: '#00B44B'}}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={orderHistoryData}
      style={{marginTop: 28}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderOrder}
    />
  );
};

export default OrderHistoryTab;
