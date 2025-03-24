import {View, Text} from 'react-native';
import React from 'react';
import Header from 'component/Header/Header';
import {styles} from './ViewPdfStyle';
import Pdf from 'react-native-pdf';
const ViewPdf = ({route}) => {
  const {url} = route.params;
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'View PDF'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <Pdf source={{uri: url}} trustAllCerts={false} style={styles.pdf} />
    </View>
  );
};

export default ViewPdf;
