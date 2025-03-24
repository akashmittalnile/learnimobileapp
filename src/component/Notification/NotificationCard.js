import React from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyText from 'component/MyText/MyText';
import {Colors, ScreenNames, Service} from 'global/index';
import VectoreIcon from 'assets/images/notificationVector.svg';
import {dimensions} from 'global/Constants';
import {REGULAR} from 'global/Fonts';

const NotificationCard = ({title = '', description = '', orderHistoryData}) => {
  const renderOrder = ({item}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
            paddingVertical: 12,
          }}>
          {/* Left Section: Icon + Texts */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: dimensions.SCREEN_WIDTH * 0.7,
            }}>
            {/* Left Icon */}
            <View
              style={{
                height: 63,
                width: 63,
                backgroundColor: Colors.LIGHT_PURPLE,
                borderRadius: 59,
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item?.image}}
                style={{
                  width: 42,
                  height: 42,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></Image>
            </View>

            {/* Title & Subtitle */}
            <View style={{marginLeft: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: dimensions.SCREEN_WIDTH * 0.7,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MyText
                    text={item?.title}
                    fontFamily={REGULAR}
                    fontSize={14}
                    textColor={Colors.BLACK}
                  />
                </View>
                <MyText
                  text={'01:25PM'}
                  fontFamily={REGULAR}
                  fontSize={14}
                  textColor={Colors.DARK_PURPLE}
                />
              </View>

              <MyText
                text={item?.message}
                fontFamily={REGULAR}
                fontSize={14}
                textColor={Colors.BLACK}
                style={{marginTop: 8}}
              />
            </View>
          </View>

          {/* Right Time */}
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

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: responsiveHeight(0.15),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,

    alignSelf: 'center',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    width: dimensions.SCREEN_WIDTH * 0.95,
    height: 'auto',
  },
  title: {
    width: '90%',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: responsiveWidth(2.5),
    backgroundColor: Colors.GREEN,
  },
  description: {
    paddingHorizontal: responsiveWidth(3),
    width: '90%',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});

export default NotificationCard;
