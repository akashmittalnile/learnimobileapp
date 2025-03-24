//import : react component
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
//import : utils
import {BOLD} from 'global/Fonts';
import {Colors} from 'global/index';
//import : styles
//import : modals
//import : redux

const Loader = ({visible, size = 'large', indicatorColor = Colors.GREEN}) => {
  //UI
  return (
    <>
      {visible ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.BLACK + 'aa',
          }}>
          <ActivityIndicator size={size} color={indicatorColor} />
          <MyText
            text="Loading..."
            textColor={Colors.GREEN}
            fontSize={16}
            fontWeight={BOLD}
            marginTop={10}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default Loader;
