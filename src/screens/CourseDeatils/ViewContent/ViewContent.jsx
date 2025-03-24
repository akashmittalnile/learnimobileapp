//import : react component
import React from 'react';
import {View, ScrollView} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
//import : third party
import FastImage from 'react-native-fast-image';
//import : utils
import {BOLD, MEDIUM} from 'global/Fonts';
//import : styles
import {styles} from './ViewContentStyle';
//import : modals
//import : redux

const ViewContent = ({route}) => {
  //variables
  const {data} = route.params;
  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'View Content'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <ScrollView style={styles.mainView}>
        <FastImage
          source={{uri: data.image}}
          resizeMode="contain"
          style={{
            height: 200,
            width: '100%',
          }}
        />
        <MyText text={data.title} fontFamily={BOLD} fontSize={24} />
        <MyText text={data.description} fontFamily={MEDIUM} />
      </ScrollView>
    </View>
  );
};

export default ViewContent;
