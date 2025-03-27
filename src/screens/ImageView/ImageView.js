import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from 'component/Header/Header';
import FastImage from 'react-native-fast-image';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ImageView = ({route}) => {
  const {url} = route.params;

  return (
    <View style={styles.container}>
      <Header showBackButton showLearneLogo={false} showCart={false} />
      <FastImage
        source={{uri: url, priority: FastImage.priority.high}}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          alignSelf: 'center',
          height: responsiveHeight(80),
          width: responsiveWidth(100),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flxe: 1,
  },
});

export default ImageView;
