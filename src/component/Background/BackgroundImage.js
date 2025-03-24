import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import BackgroundSvg from 'assets/svgs/background.svg';

const {width, height} = Dimensions.get('window');

const BackgroundImage = () => {
  return (
    <View style={styles.container}>
      <BackgroundSvg width={width} height={height} preserveAspectRatio="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default BackgroundImage;
