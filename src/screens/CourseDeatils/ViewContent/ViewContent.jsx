//import : react component
import React from 'react';
import {View, ScrollView} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
//import : third party
import FastImage from 'react-native-fast-image';
//import : utils
import {BOLD, MEDIUM, REGULAR, SEMI_BOLD} from 'global/Fonts';
//import : styles
import {styles} from './ViewContentStyle';
import DocumentIcon from '../../../assets/images/document-text.svg';
//import : modals
//import : redux

const ViewContent = ({route}) => {
  //variables
  const {data} = route.params;
  console.log('qwer', data);
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
        {data?.file && (
          <FastImage
            source={{uri: data?.file}}
            resizeMode="stretch"
            style={{
              height: 200,
              width: '100%',
            }}
          />
        )}
        {!data?.file && <DocumentIcon style={{alignSelf: 'center'}} />}
        <MyText
          text={data.title}
          fontFamily={SEMI_BOLD}
          fontSize={20}
          style={{ padding: 20}}
        />
        <MyText
          text={data.description}
          fontFamily={REGULAR}
          fontSize={14}
          style={{paddingHorizontal: 20}}
        />
      </ScrollView>
    </View>
  );
};

export default ViewContent;
