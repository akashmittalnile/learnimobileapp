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
import {styles} from './CertificateCardStyle';
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
import Download from 'assets/images/downloadCertificate.svg';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CertificateCard = ({
  orderHistoryData,
  viewDetails,
  onPressViewCertificate,
  onPressDownloadCertificate,
}) => {
  const renderOrder = ({item}) => {
    const viewPdfHandler = () => {
      onPressViewCertificate && onPressViewCertificate(item?.download_pdf);
    };

    const downloadPdfHandler = () => {
      onPressDownloadCertificate &&
        onPressDownloadCertificate(item?.download_pdf);
    };

    return (
      <View style={styles.courseContainer}>
        <View style={styles.courseSubContainer}>
          {/* <ImageBackground source={item.courseImg} style={styles.crseImg}> */}
          {/* <TouchableOpacity>
            <Image source={require('assets/images/play-icon.png')} />
          </TouchableOpacity> */}
          {/* </ImageBackground> */}
          {item?.image && (
            <Image
              source={{uri: item?.image}}
              style={{
                height: '100%',
                width: responsiveWidth(40),
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.15)',
                borderRadius: 10,
              }}
            />
          )}
          {!item?.image && <Certicate width={responsiveWidth(40)} />}
          <View style={{marginLeft: 11, width: dimensions.SCREEN_WIDTH * 0.5}}>
            <MyText
              text={item?.name}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#000000'}
              style={{width: dimensions.SCREEN_WIDTH * 0.43}}
            />
            <View style={styles.middleRow}>
              <View style={styles.crtrRow}>
                <Profile width={24} height={24}></Profile>
                <MyText
                  text={item.creator_name}
                  fontFamily={REGULAR}
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 7}}
                />
              </View>
              <View style={styles.ratingRow}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 7,
                    height: 10,
                    width: 10,
                  }}>
                  <Rating style={{marginLeft: 24}}></Rating>
                </View>
                <MyText
                  text={item.avg_rating}
                  fontFamily="regular"
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 20, marginTop: 2}}
                />
              </View>
            </View>

            <View style={styles.tickRow}>
              <TouchableOpacity onPress={viewPdfHandler}>
                <Eye height={36} width={36} />
              </TouchableOpacity>
              <TouchableOpacity onPress={downloadPdfHandler}>
                <Download style={{marginLeft: 10}} height={36} width={36} />
              </TouchableOpacity>
            </View>
          </View>
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

export default CertificateCard;
