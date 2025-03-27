import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from 'global/index';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DocView = ({style, uri, isPdf}) => {
  const navigation = useNavigation();
  // const [isPdf, setIsPdf] = useState(false);
  // useEffect(() => {
  //   if (uri.split('.').pop()?.toLowerCase() === 'pdf') {
  //     setIsPdf(true);
  //   }
  // }, []);

  const uriHandler = () => {
    if (isPdf) {
      navigation.navigate(ScreenNames.WEB_VIEW_PAGE, {url: uri});
    } else {
      navigation.navigate(ScreenNames.IMAGE_VIEW, {url: uri});
    }
  };

  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        onPress={uriHandler}
        style={{height: '90%', width: '90%'}}
        activeOpacity={0.5}>
        {isPdf && (
          <FastImage
            source={require('../../assets/images/pdf.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        )}
        {!isPdf && (
          <FastImage
            source={{uri}}
            resizeMode={FastImage.resizeMode.contain}
            style={{height: '100%', width: '100%'}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(20),
    width: responsiveWidth(40),
    borderRadius: responsiveWidth(4),
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DocView;
